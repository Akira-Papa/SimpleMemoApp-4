'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'

interface Memo {
  id: number
  content: string
  createdAt: string
  updatedAt: string
}

export default function Home() {
  const [memos, setMemos] = useState<Memo[]>([])
  const [content, setContent] = useState('')
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    fetchMemos()
  }, [])

  const fetchMemos = async () => {
    const response = await fetch('/api/memos')
    const data = await response.json()
    setMemos(data)
  }

  const createMemo = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim()) return

    await fetch('/api/memos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content }),
    })
    setContent('')
    fetchMemos()
  }

  const deleteMemo = async (id: number) => {
    await fetch(`/api/memos/${id}`, {
      method: 'DELETE',
    })
    fetchMemos()
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">メモアプリ</h1>
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700"
        >
          {theme === 'dark' ? '🌞' : '🌙'}
        </button>
      </div>

      <form onSubmit={createMemo} className="mb-8">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
          rows={4}
          placeholder="新しいメモを入力..."
        />
        <button
          type="submit"
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          保存
        </button>
      </form>

      <div className="grid gap-4">
        {memos.map((memo) => (
          <div
            key={memo.id}
            className="p-4 border rounded dark:bg-gray-800 dark:border-gray-700"
          >
            <div className="flex justify-between items-start">
              <p className="whitespace-pre-wrap">{memo.content}</p>
              <button
                onClick={() => deleteMemo(memo.id)}
                className="ml-4 text-red-500 hover:text-red-600"
              >
                削除
              </button>
            </div>
            <div className="text-sm text-gray-500 mt-2">
              {new Date(memo.createdAt).toLocaleString('ja-JP')}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
