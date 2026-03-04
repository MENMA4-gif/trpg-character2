let currentSlot = 1;

/* =====================
   共通ID一覧（超重要）
===================== */

const ids = [
  "nameInput","ageInput","personality","history",
  "secret","like","dislike",
  "firstImpression","strength","weakness",
  "important","secretDetail","future"
];

/* =====================
   画面切り替え
===================== */

function show(id){
  document.getElementById(id).style.display = "block";
}

function hide(id){
  document.getElementById(id).style.display = "none";
}

function isVisible(id){
  return document.getElementById(id).style.display === "block";
}

function goSave(){
  show("saveScreen");
  hide("startScreen");
  document.getElementById("backButton").style.display = "block";
  updateSlotNames();
}

function loadSlot(slot){
  currentSlot = slot;
  hide("saveScreen");
  show("profileScreen");
  loadProfile();
  document.getElementById("backButton").style.display = "block";
}

/* =====================
   保存
===================== */

function saveProfile(){

  let profile = {};

  // 入力欄を全部保存
  ids.forEach(id=>{
    const el = document.getElementById(id);
    if(el){
      profile[id] = el.value;
    }
  });

  localStorage.setItem(
    "profile" + currentSlot,
    JSON.stringify(profile)
  );

  document.getElementById("showName").textContent =
    "保存しました！";

  updateSlotNames();
}

/* =====================
   読み込み
===================== */

function loadProfile(){

  // 全リセット
  ids.forEach(id=>{
    const el = document.getElementById(id);
    if(el) el.value = "";
  });

  document.getElementById("showName").textContent = "";

  let data = localStorage.getItem("profile" + currentSlot);

  if(!data){
    document.getElementById("showName").textContent =
      "まだデータがありません";
    return;
  }

  let profile = JSON.parse(data);

  ids.forEach(id=>{
    const el = document.getElementById(id);
    if(el){
      el.value = profile[id] || "";
    }
  });

  document.getElementById("showName").textContent =
    "データを読み込みました";
}

/* =====================
   セーブスロット名更新
===================== */

function updateSlotNames(){

  for(let i=1;i<=3;i++){

    let btn = document.querySelector(
      `button[onclick="loadSlot(${i})"]`
    );

    if(!btn) continue;

    let data = localStorage.getItem("profile"+i);

    if(data){
      let profile = JSON.parse(data);
      btn.textContent =
        "データ" + i + "：" +
        (profile.nameInput || "名前なし");
    }else{
      btn.textContent = "データ" + i;
    }
  }
}

/* =====================
   戻るボタン
===================== */

function handleBack(){

  if(isVisible("profileScreen")){
    hide("profileScreen");
    show("saveScreen");
    updateSlotNames();
    return;
  }

  if(isVisible("saveScreen")){
    hide("saveScreen");
    show("startScreen");
    document.getElementById("backButton").style.display = "none";
  }
}

/* =====================
   閲覧モード
===================== */

let viewMode = false;

function toggleViewMode(){

  const paper = document.querySelector(".paper");
  if(!paper) return;

  viewMode = !viewMode;

  if(viewMode){
    paper.classList.add("viewMode");
  }else{
    paper.classList.remove("viewMode");
  }
}

/* =====================
   印刷（PDF）
===================== */

function printProfile(){
  window.print();
}

/* =====================
   データ削除
===================== */

function resetProfile(){

  const ok = confirm("このデータを完全に削除しますか？");
  if(!ok) return;

  localStorage.removeItem("profile"+currentSlot);

  ids.forEach(id=>{
    const el = document.getElementById(id);
    if(el) el.value = "";
  });

  document.getElementById("showName").textContent =
    "データを削除しました";

  updateSlotNames();
}