# AGENTS.md

## はじめに

本調査では、膨大なコード・履歴・ログ・文書・公開資料を横断して扱う必要があるため、LLM Agent の活用を前提とすることは避けられない。
そのため、人間の研究者と Agent は共同で作業を行うが、Agent は調査過程において作業ログの整理、本文追記、要約、監査補助、仮説整理等を担う場合がある。

一方で、LLM Agent は、もっともらしい説明や過度な一般化、意図の断定、未確認情報の補完を行ってしまう危険を持つ。
したがって、本調査では本 `AGENTS.md` を共通の文章ポリシーおよび作業ガードとして用い、調査結果をできる限り客観的・中立的・反証可能な形で保つことを目的とする。文章タイトルこそ `AGENTS` であるが、本文書は人間も含めた調査全体での最上位のガイドラインとして機能する。

## 本 GitHub Pages の位置づけ

`vega-hbmx-pages` は温存しつつ、ここではより広範な GPU や、ROCm そのものの構造に焦点を当てた参照ページを構築する。
`vega-hbmx-pages` が主に Vega 世代からの出発点のまとめであるのに対し、本ページは `vega-hbmx-pages` の設計思想をより広範なスタックに拡張した公開物として機能する。

**スタイル参照**: 本サイトの HTML/CSS デザインは `vega-hbmx-pages` を参考にしている。badge・callout・phase-grid・timeline・data-table・call-chain などの CSS コンポーネントは `assets/css/style.css` で定義されており、各 GPU 世代ページで一貫して使用する。

---

## 1. 基本原則

### 1.1 観測可能な範囲を超えて断定しない

Agent は、公開一次資料、ローカル clone、実機ログ、逆アセンブル結果など、実際に確認できた根拠を超えて断定してはならない。
特に、非公開 issue、社内意思決定、maintainer の意図については、観測可能な範囲を明示したうえで扱うこと。

### 1.2 事実・解釈・未解決を分ける

本文・メモ・要約では、少なくとも次の3層を区別すること。

- **Fact（観測済み事実）**: 実際に確認済みの事実。HTML では `観測済み事実` セクションに記載。
- **Interpretation（現時点での知見）**: 事実から読める解釈。HTML では `現時点での知見` セクション、または callout-inferred で明示。
- **Open Question / Limitation（未確定事項・ツール制限）**: 未確定事項、限界、今後の調査課題。HTML では `未確定事項` セクションおよび callout-unresolved / callout-limited で明示。

### 1.3 意図を断定しない

「〜のために設計された」「〜を意図している」「〜を狙っている」等の表現は避け、必要な場合は以下のような表現に置き換えること。

- 「〜と読める」
- 「〜を示唆する」
- 「少なくとも構造上は〜に見える」
- 「結果として〜が成立している」

### 1.4 private 領域は限界を明記する

非公開情報に触れる場合は、毎回次を明記すること。

- issue / discussion 本文は未確認である
- 公開側から確認できるのは参照関係やコード上の痕跡に限られる
- よって、原因や意思決定の詳細は断定しない

### 1.5 主体を単線化しない

「AMD がやった」「コミュニティが支えている」といった表現は、必要に応じて次の層に分解すること。

- **投入主体**
- **維持主体**
- **運用主体**
- **修正可能主体**

### 1.6 本調査は批判文書ではなく構造分析である

本研究および調査は、AMD とコミュニティの多大な貢献の成果と構造を、敬意を払いつつ調査するものである。
目的は設計傾向・保守構造・実行経路を整理することであり、特定企業や特定個人を評価・批判することではない。

---

## 2. 文体ポリシー

### 2.1 推奨表現

- 「確認できる」「観測される」「到達している」「取得済み」「固定済み」
- 「示唆される」「と読める」
- 「少なくとも〜の範囲では言える」
- 「現時点では未確定」
- 「observer 制約により確定しない」

### 2.2 非推奨表現

- 「明らかに」「当然」「完全に証明された」「これで確定」
- 「AMD は〜を意図した」「コミュニティが維持しているに違いない」
- 「裏でこう考えていたはず」
- **「〜ルール」「〜原則」を観測済み事実として提示する**（設計方針や運用ルールは事実ではなく方針として分離すること）

### 2.3 批判的・対立的に読まれうる語の扱い

- 事件 → 観測点 / 分岐点 / 注目点
- 封じた → 止めた / 除外した / gating した
- 切り捨てた → default build から後退した / selective disable した
- 残骸 → legacy path / 残存経路

### 2.4 「観測済み事実」セクションへの記載ガイド

`観測済み事実` セクションには、次のものを記載する。

**記載すべきもの（観測事実）:**
- 実機コマンドの出力（ollama serve ログ、rocminfo、ldd 結果など）
- 取得済みの timing 数値
- 逆アセンブリで確認したシンボル・命令パターン
- ファイル存在確認・サイズ・ハッシュ

**記載すべきでないもの（事実ではない）:**
- 調査の目的・方針・ルール（→ hero セクションか別途 Method ページへ）
- 「〜を優先する」「〜のために進んでいる」（→ Planned / Method へ）
- 「MI25 と比べて〜が違う」という比較推論（→ Interpretation / 現時点での知見へ）

### 2.5 視覚的整理の推奨

- 関係・依存・フローは以下のいずれかで視覚化する（後述 Section 8 参照）:
  - **Python スクリプト生成画像**（`python/` → `assets/img/graph/`）: 有向グラフ・フローチャート・依存ツリー
  - **HTML call-chain ブロック**（`style.css` の `.call-chain`）: 線形の依存チェーン表示
- 数値データは `data-table` クラスの表で示す
- 証拠クラスは badge または callout で色分けする（confirmed / inferred / unresolved / limited）
- タイトルと内容が合致しているか確認し、不一致は適切な場所へ移動すること

### 2.6 ページ設計原則：「ナビゲーター」として機能すること

本サイトの各ページは「辞書（事実の倉庫）」ではなく「ナビゲーター（読む体験の案内）」として設計する。

事実が正確であっても、読者が「何を見ればいいか」「この事実が何を意味するか」を把握できなければ、ページは機能しない。
各ページは以下の3要素を読者に与えること：

| # | 要素 | 問い | 悪い例 | 良い例 |
|---|------|------|--------|--------|
| ① | **何を見るか** | このページで何を観察・追跡するのか | `rocblas_handle` の情報 | `ne11 ≤ 256` のとき MMQ が選ばれるかを追う |
| ② | **何が起きているか** | 観測した事実はどんな「出来事」なのか | `librocblas.so.4` が maps に存在する | Ollama runner 起動時に rocBLAS が pull-in されている |
| ③ | **だから何が分かるか** | その出来事が意味すること・分からないこと | （なし） | ロードは確認できたが、dispatch は未確認 |

#### 設計の根本原則

> **経路は静的に存在するものではなく、実行時に選ばれるもの。**
> ページは「実行ログの解説」として書き、読者が 1 つの実験を追う体験を持てる構成にする。

具体的には：
- 各セクションの冒頭に「このセクションで何を確認するか」を 1-2 文で書く
- 事実を列挙する前に「なぜこの事実を観測したか」の文脈を置く
- 「load ≠ dispatch」「observer が壊れること = 失敗ではなく発見」のように、非自明な含意は明示する
- 「示せること / 示せないこと」を対で書く（特に observer 制約がある場合）

#### NG パターン（辞書型）

```
[事実 A: ライブラリ X が存在する]
[事実 B: タイミング値 Y]
[事実 C: コード行番号 Z]
```
→ 何を見て何を結論すべきか不明。研究者には有用だが、読者には「情報」にならない。

#### OK パターン（ナビゲーター型）

```
このページでは X が runtime に pull-in されるかを追う。

[事実 A] → pull-in は確認。しかし...
[事実 B] → dispatch は未確認。理由：observer 制約（Section Y 参照）。
[結論] → X が存在することと X が使われることは別問題。
```

#### セクション内の推奨 5 ステップ構造

各セクション（または主要な観測ブロック）は以下の流れで書く。

```
① 観測ポイント（1行）: このセクションで何を追うのか
② 文脈: なぜそこを見る必要があったのか
③ データ: 実際に何が起きたか（ログ・数値・コード）
④ 含意: そこから何が言えるか / 言えないか（示せること・示せないことを対で）
⑤ 次の観測点: 次にどこを見るか（あれば）
```

この構造があることで、読者は「実験を 1 つ追う体験」を通じて文書を読み進められる。

### 2.7 アクセシビリティ原則：「読んでわかる」ページを作る

本サイトのページは専門家だけでなく、ROCm や GPU に詳しくない読者にも「なんとなく理解できる」レイヤーを持つことを目標とする。

#### 基本方針

> **専門用語を消すのではなく、専門用語の前に絵と物語を置く。**

専門用語は残す。ただし初出時に括弧補足を付け、読者が意味を掴んでから詳細に入れる構成にする。

#### 術語の括弧補足（共通辞書）

ページ内に以下の術語が初出するときは、対応する補足を括弧で付ける。同一ページ内の2回目以降は補足なしで使ってよい。

| 術語 | 括弧補足 |
|------|---------|
| kernel（GPU） | GPU の中で動く個々の「仕事の単位」 |
| dispatch | GPU にどの仕事を回すか（の割り当て） |
| GEMM | 行列同士のかけ算（LLM でとても多い演算） |
| fatbin | 複数 GPU 世代向けのコードをひとまとめにした入れ物 |
| hsaco | AMD GPU 向けにコンパイルされた実行ファイル |
| wavefront | AMD GPU が一度に並列でさばく作業の束 |
| ne11 | 行列の列数（この調査では、だいたいプロンプトのトークン数に対応） |
| MMVQ | 1トークンずつ返す場面で使われやすい専用カーネル経路（decode 向け） |
| MMQ | 最初にプロンプトをまとめて読む場面で使われやすい専用カーネル経路（prefill 向け） |
| fallback | 本命が使えないとき、別ルートに切り替えること |
| call chain | 処理がどの関数からどの関数へ渡っていくか |
| bundle | Ollama がまとめて同梱しているライブラリのセット |
| Phase A–F | 調査を段階に分けて進める設計（A から順に証拠を積み上げる） |
| prefill | 最初にプロンプト全体を読む段階 |
| decode | そのあと1トークンずつ返す段階 |
| wrap（rocprofv3） | Ollama を起動するとき、観測ツールを外からかぶせて一緒に動かすこと |
| attach | 起動済みのプロセスに後からくっついて観測すること |
| ptrace | OS が別のプログラムをのぞいたり制御したりする許可を管理する仕組み |
| bootstrap discovery | 起動時に GPU を見つけて接続する準備処理 |
| phase proxy | 直接観測の代わりに、外から読める数値を手がかりにする手法 |

#### 各ページに「入口」を作る

読者が最初の1歩で転ばないよう、以下を各ページの先頭近くに置く：

**推奨パターン：**
```
【3行で言うと】
① 何を知りたいのか
② 何が邪魔するのか
③ どう工夫するのか

【たとえ話（任意）】
難しい概念に対して、読者の日常的なイメージと結びつく1段落
```

特にこれが重要なページ：
- `rx9070xt-investigation-overview.html`（入口ページ）
- `rx9070xt-optimize-method.html`（observer 問題を扱う）
- `rx9070xt-path.html`（dispatch 分岐の詳細）

#### 手の動き（操作）を書く

「何をしているか」が読者に伝わらない原因の多くは、**操作の手順が省略されていること**。
以下のパターンが出てきたら、必ず「手順①〜⑥」形式の具体的な操作ブロックを付ける：

- phase proxy を「使った」と書くとき → 実際に何を投げ、何を読んだかの手順を書く
- observer を「試みた」と書くとき → 「何をどうかぶせたか / 何が止まったか」を書く

#### NG / OK パターン（アクセシビリティ観点）

| NG（省略語のまま） | OK（初見に伝わる書き方） |
|-------------------|----------------------|
| 「rocprofv3 で ollama serve をラップ」 | 「Ollama を起動するとき、GPU の動きを記録する観測ツール `rocprofv3` を外からかぶせて一緒に動かした」＋「専門的に言うと：`rocprofv3 wrap`」 |
| 「MMVQ / MMQ の分岐は ne11 で決まる」 | 「1トークンずつ返すか、プロンプトをまとめて処理するかの担当分けは、行列の列数（プロンプトのトークン数に対応）で自動的に切り替わる」 |
| 「dispatch-safe observer がない」 | 「GPU が今どの仕事をしているかを直接読める手段がない」 |

#### 参照実装

現在のページで上記方針を実装した例：
- `rx9070xt-optimize-method.html` — 「やさしく言うと」節（カメラ/ドア/窓/メーターのたとえ）
- `rx9070xt-investigation-overview.html` — 「まず3行で」節（工場の機械のたとえ）
- 各 observer ステップの見出し：平易な日本語タイトル＋技術名の並記

---

## 3. 記述テンプレート

### 3.1 HTML ページ構成（標準）

```
hero         — ページの目的・対象環境・phase バッジ
観測済み事実  — 実機・ソース・バイナリで確認した事実のみ
現時点での知見 — 事実からの推論（callout-inferred で明示）
未確定事項    — 未解決・tool-limited（callout-unresolved / callout-limited）
追記予定      — 次のアクション
note         — 全ページ共通の免責
```

各セクションには、

1. 最初に掴むべき観測ポイント（1行）
2. 何をしたか（観測の文脈）
3. 何が起きたか（データ）
4. そこから何が言えるか / 言えないか
5. 次にどこを見るか

を入れる。

### 3.2 技術ノート（.md）

- **Observed（観測済み）**
- **Inferred（推論）**
- **Unresolved（未確定）**
- **Tool-limited（ツール制限）**

### 3.3 private issue 参照時の注記（日本語）

> この issue は非公開であり、本文は外部から確認できない。したがって、ここから言えるのは公開コード側に参照関係と gating の痕跡が存在するという範囲に限られる。

### 3.3a private issue 参照時の注記（英語）

> This issue is not publicly accessible; its content cannot be verified from outside. Accordingly, what can be stated here is limited to the observable reference relationship and gating pattern in the public codebase.

### 3.4 文書末尾の Non-claims

主要文書には必要に応じて、次の節を付けること。

#### 本文書が主張しないこと

- 社内意思決定過程を断定するものではない
- 非公開 issue の本文を推定で補完するものではない
- 単一事例から一般法則を断定するものではない
- AMD の support policy 全体を完全に代表するものではない
- 特定組織への批判を目的とするものではない

#### This document does not claim that...

- Internal decision-making processes are asserted or concluded.
- The content of private issues has been inferred or reconstructed.
- A single observed case is generalized into a universal rule.
- AMD's support policy as a whole is fully represented.
- Any specific organization is being criticized.

---

## 4. Agent の役割分担

### 4.1 Agent が担ってよいもの

- 既存文書の整理・追記（investigation .md → public HTML の反映を含む）
- 作業ログの日付付きタイムライン化
- 根拠整理・badge / callout による証拠クラスの色分け
- 仮説のラベリング（推論であることを callout-inferred で明示）
- 誤読リスクの監査（「観測済み事実」に事実でないものが混入していないかの点検）
- 文体の中立化提案
- 参考用サマリの作成
- HTML ページのコンテンツ更新（investigation .md の内容を正確に反映）

### 4.2 Agent が単独で確定してはならないもの

- 社内事情の断定
- private issue 内容の推定確定
- 著者・maintainer の意図断定
- 「一般法則」としての最終認定
- 対外公開版の最終確定
- 実機で取得していない数値の補完・推定値の事実化

### 4.3 最終責任

最終的な公開判断・表現確定・対外共有可否の責任は人間の調査者が持つ。
Agent はあくまで補助者であり、最終決定者ではない。

---

## 5. 実務上の優先順位

カードごとに違いはあるものの、文書修正時は次の順で作業すること。

**注意**: investigation 文書（.md）を修正したら、対応する公開 HTML に同内容の修正を反映すること。
MD と HTML の間で表現が乖離しないよう、変更はセットで管理する。

### 世代早見表

## 対応表

| gfxターゲット                    | 大分類  | 世代名                    | 代表例                                            |
| --------------------------- | ---- | ---------------------- | ---------------------------------------------- |
| `gfx900`                    | GCN  | **Vega 10**            | Radeon RX Vega 56/64, Radeon Instinct MI25     |
| `gfx902`                    | GCN  | **Raven系 APU**         | Ryzen 3 2200G, Ryzen 5 2400G                   |
| `gfx904`                    | GCN  | **Vega系派生**            | 公開資料では製品名ほぼ未記載                                 |
| `gfx906`                    | GCN  | **Vega 20 / 7nm Vega** | Radeon VII, Radeon Pro VII, Instinct MI50/MI60 |
| `gfx908`                    | CDNA | **CDNA 1**             | Instinct MI100                                 |
| `gfx90a`                    | CDNA | **CDNA 2**             | Instinct MI210, MI250, MI250X                  |
| `gfx942`                    | CDNA | **CDNA 3**             | Instinct MI300A, MI300X                        |
| `gfx950`                    | CDNA | **次世代CDNA系**           | LLVM資料では製品名TBA                                 |
| `gfx1010` / `1011` / `1012` | RDNA | **RDNA 1**             | RX 5700/5700 XT, RX 5500系                      |
| `gfx1030` / `1031` / `1032` | RDNA | **RDNA 2**             | RX 6800/6800 XT/6900 XT, RX 6700 XT            |
| `gfx1100` / `1101` / `1102` | RDNA | **RDNA 3**             | RX 7900 XTX/XT/GRE, RX 7800 XT, RX 7600        |
| `gfx1150` / `1151` / `1152` | RDNA | **RDNA 3.5**           | Radeon 890M, 860M などのAPU系                      |
| `gfx1170`                   | RDNA | **RDNA 4m**            | モバイル寄り派生として記載                                  |
| `gfx1200`                   | RDNA | **RDNA 4**             | RX 9060 / 9060 XT                              |
| `gfx1201`                   | RDNA | **RDNA 4**             | RX 9070 / 9070 XT / 9070 GRE                   |
| `gfx1250` / `1251`          | RDNA | **RDNA 4系 APU**        | LLVM資料ではTBA                                    |
| `gfx1310`                   | RDNA | **RDNA 5**             | LLVM資料ではTBA                                    |

### MI25 の場合（GCN5）

1. **上位 investigation 文書**（`rdna4_investigations/` または MI25 対応ディレクトリ）
2. **高露出 public HTML 文書**
   - `gpu-gen/GCN5/mi25/mi25-overview.html`
   - `gpu-gen/GCN5/mi25/mi25-path.html`
   - `gpu-gen/GCN5/mi25/mi25-optimize.html`
3. **補助 HTML 文書**
   - `gpu-gen/GCN5/mi25/mi25-path-worklog.html`
   - `gpu-gen/GCN5/mi25/mi25-optimize-method.html`
   - `gpu-gen/GCN5/mi25/mi25-optimize-worklog.html`

### RX9070XT の場合（rDNA4）

1. **上位 investigation 文書**
   - `rdna4_investigations/results/rDNA4_RX9070XT/runtime_disassembly_correlation.md`
   - `rdna4_investigations/results/rDNA4_RX9070XT/disassembly_notes.md`
   - `rdna4_investigations/results/rDNA4_RX9070XT/phase_proxy_probe_20260328_q4km.md`
   - `rdna4_investigations/results/rDNA4_RX9070XT/case_20260327_ollama_rocm_runtime_path.md`
   - `rdna4_investigations/results/rDNA4_RX9070XT/runtime_path_notes.md`
   - `rdna4_investigations/results/rDNA4_RX9070XT/known_caveats.md`
2. **高露出 public HTML 文書**
   - `gpu-gen/rDNA4/R9070XT/rx9070xt-overview.html`
   - `gpu-gen/rDNA4/R9070XT/rx9070xt-path.html`
   - `gpu-gen/rDNA4/R9070XT/rx9070xt-optimize-method.html`
3. **補助 HTML 文書**
   - `gpu-gen/rDNA4/R9070XT/rx9070xt-path-worklog.html`
   - `gpu-gen/rDNA4/R9070XT/rx9070xt-optimize.html`
   - `gpu-gen/rDNA4/R9070XT/rx9070xt-optimize-worklog.html`
   - `gpu-gen/rDNA4/R9070XT/rx9070xt-index.html`

### MI300X の場合（cDNA3）

1. **上位 investigation 文書**（追加次第ここに記載）
2. **高露出 public HTML 文書**
   - `gpu-gen/cDNA3/MI300X/mi300x-index.html`
3. **補助 HTML 文書**（追加次第ここに記載）

---

## 6. RX9070XT / rDNA4 固有の注意事項

### 6.1 世代ごとの「観測の世界観」（重要な設計軸）

本調査で GPU 世代を横断して語るとき、単なる「サポート状況の違い」としてではなく、以下の**世界観の違い**として扱うこと。

| 世代 | GFX | 系統 | 観測の世界観 |
|------|-----|------|------------|
| Vega / MI25 | gfx900 | GCN | fallback が主戦場。本命経路は通らない前提で観測する |
| RDNA4 / RX9070XT | gfx1201 | RDNA | 通るものと通らないものが**混在**。観測しないと分からない。研究として最も面白い |
| MI300X | gfx942 | CDNA | ほぼ本命が通ると思われる（要確認）。正規ルートの確認が主。fallback 観測は副次的 |

MI300Xは確かに「本命は通る」側ではある。ただし、MI400Xの登場も噂されており、MI300Xもいずれ陳腐化は避けられない運命なので、この点に関しては確認は必要である。

> gfx1201 は「fallback でも本命でもない」——"分岐そのもの"を観測する世代。

これはコンポーネントページの世代横断表・investigation-overview の narrative・トップページの位置づけ説明すべてに一貫して使う軸。

### 6.2 gfx1201 と MI25（gfx906）の差異

- `wavefront_size`: gfx1201 = **32**、MI25 = 64。MI25 での signature・register footprint をそのまま RDNA4 に適用しない。
- kernel family も別系統。MI25 での可視性（直接 GEMM 名など）を gfx1201 での成功条件にしない。

### 6.3 Observer 制約（2026-03-28 時点）

- `rocprofv3` wrap → bootstrap discovery failure → CPU fallback。この状態でのデータは observer 汚染として扱う。
- `rocprofv3 --attach` → ptrace_scope=1 によりブロック。
- `ROCBLAS_LAYER=9` → `rocblas_create_handle` のみ。per-GEMM attribution には不足。
- Phase proxy（response JSON の `prompt_eval_count / eval_count / eval_duration`）は runtime を壊さない唯一の現実的な proxy。ただし kernel launch 時の正確な `ne11` を直接読んでいるわけではない。

### 6.4 Bundle / hsaco の記述

- `.hip_fatbin` は単一 per-target blob ではなく、`__CLANG_OFFLOAD_BUNDLE__` が連結されたストリーム。bundle 番号（`bundle_XXXX`）は抽出順であり、固定 ID ではない点に注意。
- 逆アセンブリ結果を記載する際は bundle 番号・サイズ・主要シンボルをセットで記録する。

---

## 8. グラフ・図の生成

### 8.1 ディレクトリ構成

```
python/               ← グラフ生成スクリプト置き場
  .venv/              ← Python 3.12 仮想環境（コミットしない）
  requirements.txt    ← 使用ライブラリ一覧
assets/img/graph/     ← 生成済み画像の出力先（HTML から参照）
```

### 8.2 ワークフロー

1. `python/` 以下にスクリプトを作成する
2. `.venv` を有効化して実行: `source python/.venv/bin/activate && python python/<script>.py`
3. 生成した画像は `assets/img/graph/<name>.webp` に出力する（webp 推奨）
4. HTML ページから `<img src="../../../assets/img/graph/<name>.png" alt="..." class="graph-img" />` で埋め込む

### 8.3 命名規則

- スクリプト: 対象コンポーネントと図の種類を含める（例: `gen_ggml_dispatch_flow.py`, `gen_bundle_dep_tree.py`）
- 画像: スクリプト名と対応させる（例: `ggml_dispatch_flow.png`, `bundle_dep_tree.svg`）

### 8.4 依存ライブラリの追加方法

`requirements.txt` に記載してから `pip install -r requirements.txt` で導入する。
ライブラリを追加した場合は `requirements.txt` を更新してコミット対象に含める。
`.venv/` 自体はコミットしない（`.gitignore` で除外）。

### 8.5 優先作成図

| 図 | スクリプト（予定） | 埋め込み先 |
|----|-------------------|-----------|
| ggml dispatch flowchart（ne11 閾値 → MMVQ/MMQ/BLAS） | `gen_ggml_dispatch_flow.py` | `rx9070xt-path.html` |
| bundle 依存ツリー（12 ライブラリ有向グラフ） | `gen_bundle_dep_tree.py` | `rocm-bundle-index.html` |
| Phase A-F methodology フロー | `gen_phase_flow.py` | investigation-overview |
| observer 制約マップ | `gen_observer_constraints.py` | `rx9070xt-optimize-method.html` |

---

## 7. 最重要の共通文

必要に応じて、各文書の冒頭または末尾に以下を置くこと。

日本語:
> 本文章は、公開一次資料およびローカル clone から観測可能な範囲を整理したものであり、非公開 issue や社内意思決定の内容を断定するものではない。

英語:
> This document organizes observations from publicly available sources and local repository clones only. It does not assert the contents of private issues or internal decision-making processes.

---
