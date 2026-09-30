#!/bin/bash

set -e
set -euo pipefail

echo "=================================================="
echo "roles配下ディレクトリの再構築処理を開始します。"
echo ""
echo "未コミットの変更がある場合は、先にcommitしてください。"
echo ""
read -p "実行しますか？ (y/N): " answer

if [[ "${answer}" != "y" && "${answer}" != "Y" ]]; then
    echo "処理を中止しました。"
    exit 1
fi
echo ""
echo "コミット済みであることを確認しました。"
echo "処理を開始します。"
echo "=================================================="

# スクリプトが置かれているディレクトリ
PROJECT_DIR="$(cd "$(dirname "$0")" && pwd)"

# ネイティブAnsible実行環境のロールが置かれているディレトリ
ROLES_DIR="${PROJECT_DIR}/roles"

# roles配下のロールを取得
for ROLE_DIR in "${ROLES_DIR}"/*; do

  # ディレクトリ以外はスキップ
  [ -d "${ROLE_DIR}" ] || continue

  ROLE_NAME="$(basename "${ROLE_DIR}")"

  # _gatheringで終わるロール(収集ロール)
  if [[ "${ROLE_NAME}" == *_gathering ]]; then
    # _gatheringを取り除いたロール名
    ROLE_NAME="${ROLE_NAME%_gathering}"

    # コピー先
    GATHERING_DIR="${PROJECT_DIR}/${ROLE_NAME}/gathering"

    # コピー先ディレクトリが存在しない場合は作成
    mkdir -p "${GATHERING_DIR}"

    # _gatheringロールの中身をgatheringへコピー
    cp -a "${ROLE_DIR}/." "${GATHERING_DIR}"

    echo "...Processing gathering role: ${ROLE_NAME}"
    echo "  -> ${GATHERING_DIR}"

  # 構築ロール
  else
    # コピー先
    BUILD_DIR="${PROJECT_DIR}/${ROLE_NAME}/build"

    # コピー先ディレクトリが存在しない場合は作成
    mkdir -p "${BUILD_DIR}"

    # _gatheringロールの中身をgatheringへコピー
    cp -a "${ROLE_DIR}/." "${BUILD_DIR}"

    echo "...Processing gathering role: ${ROLE_NAME}"
    echo "  -> ${BUILD_DIR}"
  fi
done
echo ""
echo "=================================================="
echo "処理が完了しました。"
echo "再度コミットをお願いします。"
echo "その後、開発ブランチへ切り替え、"
echo "当該コミットのcherry-pickをお願いします。"
echo "=================================================="
