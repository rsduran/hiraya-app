from flask import jsonify, abort, request
from app import app, db
from models import Provider, Exam, Topic
from utils import get_exam_order

@app.route('/api/providers', methods=['GET'])
def get_providers():
    page = request.args.get('page', type=int)
    per_page = request.args.get('per_page', type=int)
    
    if page is None or per_page is None:
        providers = Provider.query.all()
        return jsonify({
            'providers': [
                {
                    'name': provider.name,
                    'exams': sorted([
                        {
                            'id': f"{provider.name}-{exam.title}",
                            'title': exam.title,
                            'progress': exam.progress,
                            'totalQuestions': exam.total_questions,
                            'order': get_exam_order(exam.title, provider.name)
                        } for exam in provider.exams
                    ], key=lambda x: (x['order'], x['title'])),
                    'isPopular': provider.is_popular
                } for provider in providers
            ],
            'total': len(providers),
            'pages': 1,
            'current_page': 1
        })
    else:
        providers = Provider.query.paginate(page=page, per_page=per_page, error_out=False)
        return jsonify({
            'providers': [
                {
                    'name': provider.name,
                    'exams': sorted([
                        {
                            'id': f"{provider.name}-{exam.title}",
                            'title': exam.title,
                            'progress': exam.progress,
                            'totalQuestions': exam.total_questions,
                            'order': get_exam_order(exam.title, provider.name)
                        } for exam in provider.exams
                    ], key=lambda x: (x['order'], x['title'])),
                    'isPopular': provider.is_popular
                } for provider in providers.items
            ],
            'total': providers.total,
            'pages': providers.pages,
            'current_page': page
        })

@app.route('/api/exams/<exam_id>', methods=['GET'])
def get_exam(exam_id):
    if exam_id == 'undefined' or '-' not in exam_id:
        abort(400, description="Invalid exam ID")
    
    provider_name, exam_title = exam_id.split('-', 1)
    provider = Provider.query.filter_by(name=provider_name).first()
    if not provider:
        abort(404, description="Provider not found")
    
    exam = Exam.query.filter_by(title=exam_title, provider_id=provider.id).first()
    if not exam:
        abort(404, description="Exam not found")
    
    exam_data = {
        'id': exam_id,
        'provider': provider.name,
        'examTitle': exam.title,
        'examCode': '',
        'topics': {topic.number: topic.data for topic in exam.topics}
    }
    
    exam_title_parts = exam.title.split('-code-')
    if len(exam_title_parts) == 2:
        exam_data['examTitle'], exam_data['examCode'] = exam_title_parts
    
    return jsonify(exam_data)