document.getElementById("searchBtn").addEventListener("click", (event) => {
  const username = document.getElementById("username").value.trim();
  const resultDiv = document.getElementById("result");
  event.preventDefault(); // フォームのデフォルト送信をキャンセル
  if(!username) {
    resultDiv.innerHTML = "<p>ユーザ名を入力してください。</p>";
    return;
  }

  fetch(`https://api.github.com/users/${username}`)
    .then(res => {
      if(!res.ok) throw new Error("ユーザが見つかりませんでした");
      return res.json();
    })
   .then(data => {
     resultDiv.innerHTML = `
       <p><strong>ユーザ名:</strong> ${data.login}</p>
       <p><strong>名前:</strong> ${data.name || "未設定"}</p>
       <p><strong>フォロワー数:</strong> ${data.followers}</p>
       <p><strong>公開リポジトリ数:</strong> ${data.public_repos}</p>
       <img src="${data.avatar_url}" width="100" alt="アイコン画像"></img>
     `;
  })
  .catch(err => {
    resultDiv.innerHTML = `<p style="color: red;">${err.message}</p>`;
  })
});
