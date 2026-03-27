# ROCm-pages

GitHub Pages 用の公開ディレクトリです。  
目的は、ROCm・GPU世代・関連コンポーネントの現状を「観測済み事実ベース」で整理して公開することです。

## 方針

- 断定は観測済み事実に限定する
- 未確定事項は `準備中 / Coming soon` として明示する
- 観測・解釈・未確定を混同しない

## 入口ページ

- Top: `index.html`
- ROCm 共通: `ROCm-common/rocm-index.html`
- GPU 世代: `gpu-gen/index.html`
- LLVM 関連: `LLVM/llvm-index.html`

## 現時点の状態（このワークスペース）

- GCN5 / MI25 は記述が最も進んでいる
- rDNA4 / RX9070XT は portability pilot の観測結果を反映中
- cDNA4 / MI300X は方法論移植の準備段階
- LLVM は参照導線を整備中

## 更新時の注意

- 「速かった/遅かった」だけで結論を書かない
- workload 依存の結果を一般化しない
- kernel-level 因果が未確定な場合はそのまま未確定として記載する
