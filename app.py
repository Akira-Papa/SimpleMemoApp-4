from flask import Flask, render_template, request, redirect, url_for
from models import db, Memo
import os

app = Flask(__name__)

# Configure PostgreSQL database
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ['DATABASE_URL']
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize the database
db.init_app(app)

@app.route('/')
def index():
    memos = Memo.query.order_by(Memo.created_at.desc()).all()
    return render_template('index.html', memos=memos)

@app.route('/memo/create', methods=['POST'])
def create_memo():
    content = request.form.get('content', '')
    if content:
        memo = Memo(content=content)
        db.session.add(memo)
        db.session.commit()
    return redirect(url_for('index'))

@app.route('/memo/delete/<int:memo_id>', methods=['POST'])
def delete_memo(memo_id):
    memo = Memo.query.get_or_404(memo_id)
    db.session.delete(memo)
    db.session.commit()
    return redirect(url_for('index'))

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(host='0.0.0.0', port=5000, debug=True)
