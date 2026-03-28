# ROCm-common

ROCm の共通コンポーネントをまとめるセクションです。  
GPU世代ごとの個別結果ではなく、世代横断で参照されるライブラリや基盤を扱います。  

## 重要事項：
各コンポーネントの冒頭には、そのコンポーネントが一体なんなのか、どういう役割のもので、何と関連しているのかを詳細に記してください。関係性などを示す場合、Marmaidなどを使って書きます。

## 入口

- `rocm-index.html`
個々の冒頭には、ROCmのスタック図などをMarmaidなども用いて書いてください。

## 配下ページ

- `rocBLAS/rocblas-index.html`
- `Tensile/tensile-index.html`
- `MIOpen/miopen-index.html`
- `MIGraphX/migraphx-index.html`
- `ggml-hip/ggml-hip-index.html`
- `hipBLAS/hipblas-index.html`
- `hipBLASLt/hipblasslt-index.html`
- `rocSOLVER/rocsolver-index.html`
- `bundle/rocm-bundle-index.html`

## 現時点の記述方針

- MI25 系調査で観測された事実を優先して反映する
- コンポーネント別の最終評価は、根拠ログが揃うまで保留する
- 世代横断で共通に使える説明を優先し、特定ワークロード依存の主張は限定付きで書く

## まだ書かないこと

- 未観測の経路断定
- solver/kernel の 1:1 因果断定
- 将来世代への性能一般化
