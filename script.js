const startBtn = document.getElementById('startBtn');
const board = document.getElementById('gameBoard');

let firstCard = null;
let lock = false;



// Google Drive画像のファイルID（8組＝16枚）
const imageIds = [
"1dhEN2MWJDeTuzX1KUq8y5v7zpt1SoAin",
"1iazZvPpx4pRCaHpxGT27HqEi4DDkFjtq",
"1XG-lvX7Ep_gZI3PEx2A_qcyAf9wNpxoJ",
"16nc77aapU2Uho9NcgKKNu-a4JxxFZ26k",
"19R11Ql5f0znd728udzCCiSz02He-fX7Y",
"1ha8mmokyiRYHRRmhiQ9n48T7l6mPS7e9",
"1IG4VIDPReEs3tEwCuw5YLnhQNPJBS4gz",
"11Oey1WP2T-ezfnTHWtEe_U98wOc5ZCJY"
];

// ゲーム開始ボタン押下時
startBtn.addEventListener('click', () => {
  startGame();
});

function startGame() {
  board.innerHTML = '';
  firstCard = null;
  lock = false;

  // 画像URLを作りペアを用意
  let images = [];
  imageIds.forEach(id => {
    const url = `https://drive.google.com/uc?export=view&id=${id}`;
    images.push(url);
    images.push(url);
  });

  // シャッフル
  images.sort(() => Math.random() - 0.5);

  // カード生成
  images.forEach((src, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.index = index;

    const cardInner = document.createElement('div');
    cardInner.classList.add('card-inner');

    const front = document.createElement('img');
    front.classList.add('card-front');
    front.src = src;

    const back = document.createElement('div');
    back.classList.add('card-back');

    cardInner.appendChild(front);
    cardInner.appendChild(back);
    card.appendChild(cardInner);
    board.appendChild(card);

    card.addEventListener('click', () => onCardClick(card, src));
  });
}

function onCardClick(card, image) {
  if (lock || card.classList.contains('flipped')) return;

  card.classList.add('flipped');

  if (!firstCard) {
    firstCard = { card, image };
  } else {
    lock = true;
    setTimeout(() => {
      if (firstCard.image === image) {
        // 正解：非表示にする
        card.style.visibility = 'hidden';
        firstCard.card.style.visibility = 'hidden';
      } else {
        // 不正解：戻す
        card.classList.remove('flipped');
        firstCard.card.classList.remove('flipped');
      }
      firstCard = null;
      lock = false;
    }, 800);
  }
}
