let wantApple = 4;
let stockApple = 3;

if (stockApple >= wantApple) {
  console.log("希望通りカートに入れます。");
} else {
  console.log("在庫が足りません。在庫分だけカートに入れます。");
}

let i = 0;
while (i < stockApple) {
  console.log("りんごをカートに追加しました");
  i++;
}

for (let j = 1; j <= stockApple; j++) {
  console.log(`リンゴを買うのは${j}回目の処理です`);
}
