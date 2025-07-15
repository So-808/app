import React, { useState } from "react";
import './App.css';

const initialJobs = [
  {
    id: 1,
    title: "カフェスタッフ",
    tags: ["飲食", "未経験OK", "おしゃれ"],
    priority: true,
    published: true,
    draft: false,
    description: "カワイイカフェで働こう！先輩もみんな優しいよ☕️",
  },
  {
    id: 2,
    title: "イベント運営サポート",
    tags: ["イベント", "単発", "レアバイト"],
    priority: false,
    published: false,
    draft: true,
    description: "人気イベントを裏から支える！楽しい仲間がいっぱい✨",
  },
];

export default function App() {
  const [jobs, setJobs] = useState(initialJobs);
  const [editId, setEditId] = useState(null);
  const [searchTag, setSearchTag] = useState("");
  const [form, setForm] = useState({
    title: "",
    tags: "",
    priority: false,
    published: false,
    draft: true,
    description: "",
  });

  // 検索フィルタ
  const filteredJobs = jobs.filter(job =>
    searchTag === "" || job.tags.some(tag => tag.includes(searchTag))
  );

  // 編集開始
  const startEdit = (job) => {
    setEditId(job.id);
    setForm({
      title: job.title,
      tags: job.tags.join(","),
      priority: job.priority,
      published: job.published,
      draft: job.draft,
      description: job.description,
    });
  };

  // フォーム変更
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({
      ...f,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  // 新規 or 編集保存
  const handleSave = () => {
    if (!form.title) return;
    if (editId) {
      setJobs(jobs.map(j => j.id === editId ? {
        ...j,
        ...form,
        tags: form.tags.split(",").map(s => s.trim()),
        draft: !form.published
      } : j));
      setEditId(null);
    } else {
      setJobs([
        ...jobs,
        {
          id: Date.now(),
          ...form,
          tags: form.tags.split(",").map(s => s.trim()),
          draft: !form.published
        }
      ]);
    }
    setForm({ title: "", tags: "", priority: false, published: false, draft: true, description: "" });
  };

  // 削除
  const handleDelete = (id) => {
    setJobs(jobs.filter(j => j.id !== id));
    if (editId === id) setEditId(null);
  };

  // 下書き保存
  const handleDraft = () => {
    setForm(f => ({ ...f, published: false, draft: true }));
    handleSave();
  };

  // 優先表示トグル
  const togglePriority = (id) => {
    setJobs(jobs.map(j => j.id === id ? { ...j, priority: !j.priority } : j));
  };

  // 公開トグル
  const togglePublish = (id) => {
    setJobs(jobs.map(j => j.id === id ? { ...j, published: !j.published, draft: j.published } : j));
  };

  return (
    <div className="admin-bg">
      <header className="admin-header">
        <h1>しごとパレット 管理画面</h1>
        <input
          type="text"
          placeholder="ハッシュタグ検索 (例: 飲食)"
          value={searchTag}
          onChange={e => setSearchTag(e.target.value)}
          className="search-input"
        />
      </header>
      <main>
        <section className="job-form-section">
          <h2>{editId ? "求人編集" : "新規求人追加"}</h2>
          <div className="job-form">
            <input name="title" value={form.title} onChange={handleChange} placeholder="タイトル" className="input" />
            <input name="tags" value={form.tags} onChange={handleChange} placeholder="タグ (カンマ区切り)" className="input" />
            <textarea name="description" value={form.description} onChange={handleChange} placeholder="仕事内容説明" className="input textarea" />
            <label><input type="checkbox" name="priority" checked={form.priority} onChange={handleChange} /> 優先表示</label>
            <label><input type="checkbox" name="published" checked={form.published} onChange={handleChange} /> 公開</label>
            <div className="form-btns">
              <button onClick={handleSave} className="save-btn">{editId ? "更新" : "追加"}</button>
              <button onClick={handleDraft} className="draft-btn">下書き保存</button>
              {editId && <button onClick={() => setEditId(null)} className="cancel-btn">キャンセル</button>}
            </div>
          </div>
        </section>
        <section className="job-list-section">
          <h2>求人一覧</h2>
          <div className="job-list">
            {filteredJobs.length === 0 && <p>該当する求人がありません</p>}
            {filteredJobs.map(job => (
              <div className={`job-card${job.priority ? " priority" : ""}`} key={job.id}>
                <div className="job-title-row">
                  <span className="job-title">{job.title}</span>
                  {job.priority && <span className="priority-badge">優先</span>}
                  {job.published ? <span className="published-badge">公開</span> : <span className="draft-badge">下書き</span>}
                </div>
                <div className="job-tags">
                  {job.tags.map(tag => (
                    <span className="job-tag" key={tag}>{tag}</span>
                  ))}
                </div>
                <p className="job-desc">{job.description}</p>
                <div className="job-actions">
                  <button onClick={() => startEdit(job)} className="edit-btn">編集</button>
                  <button onClick={() => togglePriority(job.id)} className="priority-btn">{job.priority ? "優先解除" : "優先"}</button>
                  <button onClick={() => togglePublish(job.id)} className="publish-btn">{job.published ? "非公開" : "公開"}</button>
                  <button onClick={() => handleDelete(job.id)} className="delete-btn">削除</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
