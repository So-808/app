import React from "react";
import './App.css';
import logo from "./assets/logo.svg";

const jobs = [
  {
    id: 1,
    title: "カフェスタッフ",
    image: "/assets/cafe.svg",
    tags: ["未経験OK", "おしゃれ", "駅チカ"],
    salary: "時給1,200円〜",
    location: "渋谷区",
    description: "カワイイカフェで働こう！先輩もみんな優しいよ☕️"
  },
  {
    id: 2,
    title: "イベント運営サポート",
    image: "/assets/event.svg",
    tags: ["単発", "友達と応募OK", "レアバイト"],
    salary: "日給10,000円〜",
    location: "新宿区",
    description: "人気イベントを裏から支える！楽しい仲間がいっぱい✨"
  },
  {
    id: 3,
    title: "クリエイティブ事務アシスタント",
    image: "/assets/creative.svg",
    tags: ["週2〜", "服装自由", "在宅OK"],
    salary: "月給20万円〜",
    location: "オンライン",
    description: "イラストや動画編集好きな方歓迎。自分らしく働ける！"
  }
];

export default function App() {
  return (
    <div className="site-bg">
      <header className="header">
        <img src={logo} alt="しごとパレット ロゴ" className="logo" />
        <h1 className="catch">カワイイ × 先進的 しごと探し</h1>
        <p className="desc">Z世代・若者のための新感覚求人サイト</p>
      </header>
      <main>
        <section className="job-list">
          {jobs.map(job => (
            <div className="job-card" key={job.id}>
              <img src={job.image} alt={job.title} className="job-img" />
              <div className="job-info">
                <h2 className="job-title">{job.title}</h2>
                <div className="job-tags">
                  {job.tags.map(tag => (
                    <span className="job-tag" key={tag}>{tag}</span>
                  ))}
                </div>
                <div className="job-meta">
                  <span className="job-salary">{job.salary}</span>
                  <span className="job-location">{job.location}</span>
                </div>
                <p className="job-desc">{job.description}</p>
                <button className="apply-btn">応募する</button>
              </div>
            </div>
          ))}
        </section>
      </main>
      <footer className="footer">
        <small>© 2025 しごとパレット</small>
      </footer>
    </div>
  );
}
