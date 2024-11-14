from flask import render_template, request, redirect, url_for, flash
from app import app, db
from models import Memo

@app.route('/')
def index():
    memos = Memo.query.order_by(Memo.updated_at.desc()).all()
    return render_template('index.html', memos=memos)

@app.route('/memo/new', methods=['POST'])
def create_memo():
    title = request.form.get('title', '').strip()
    content = request.form.get('content', '').strip()
    
    if not title or not content:
        flash('タイトルと内容を入力してください。', 'error')
        return redirect(url_for('index'))
    
    memo = Memo(title=title, content=content)
    db.session.add(memo)
    db.session.commit()
    flash('メモを作成しました。', 'success')
    return redirect(url_for('index'))

@app.route('/memo/<int:id>/edit', methods=['GET'])
def edit_memo(id):
    memo = Memo.query.get_or_404(id)
    return render_template('edit.html', memo=memo)

@app.route('/memo/<int:id>/update', methods=['POST'])
def update_memo(id):
    memo = Memo.query.get_or_404(id)
    memo.title = request.form.get('title', '').strip()
    memo.content = request.form.get('content', '').strip()
    
    if not memo.title or not memo.content:
        flash('タイトルと内容を入力してください。', 'error')
        return redirect(url_for('edit_memo', id=id))
    
    db.session.commit()
    flash('メモを更新しました。', 'success')
    return redirect(url_for('index'))

@app.route('/memo/<int:id>/delete', methods=['POST'])
def delete_memo(id):
    memo = Memo.query.get_or_404(id)
    db.session.delete(memo)
    db.session.commit()
    flash('メモを削除しました。', 'success')
    return redirect(url_for('index'))
