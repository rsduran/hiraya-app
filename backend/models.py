from app import db

class Provider(db.Model):
    __table_args__ = {'schema': 'public'}
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)
    is_popular = db.Column(db.Boolean, default=False)
    exams = db.relationship('Exam', backref='provider', lazy=True)

class Exam(db.Model):
    __table_args__ = {'schema': 'public'}
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    progress = db.Column(db.Integer, default=0)
    total_questions = db.Column(db.Integer, default=0)
    provider_id = db.Column(db.Integer, db.ForeignKey('public.provider.id'), nullable=False)
    topics = db.relationship('Topic', backref='exam', lazy=True)

class Topic(db.Model):
    __table_args__ = {'schema': 'public'}
    id = db.Column(db.Integer, primary_key=True)
    number = db.Column(db.Integer, nullable=False)
    data = db.Column(db.JSON, nullable=False)
    exam_id = db.Column(db.Integer, db.ForeignKey('public.exam.id'), nullable=False)