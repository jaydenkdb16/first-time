const generateButton = document.querySelector(".generate-button");
const generatedPost = document.querySelector("#generated-post");
const characterCount = document.querySelector("#character-count");

function getFieldValues(selector) {
  return Array.from(document.querySelectorAll(selector), (field) => field.value.trim());
}

function countOccurrences(text, word) {
  return text.split(word).length - 1;
}

function buildIntro(storeName, keywords) {
  const locationKeyword = keywords[0] || "근처";
  const foodKeyword = keywords[1] || "맛있는 메뉴";
  const combinedKeyword = keywords.length >= 2
    ? `${keywords[0]} ${keywords[1]}`
    : keywords[0] || `${storeName} 후기`;

  return [
    `${locationKeyword}에서 ${foodKeyword} 먹을 곳 찾다가 알게 된 곳이 ${storeName}이에요.`,
    "",
    `주변에서 ${combinedKeyword}로 많이 이야기되길래`,
    "궁금해서 다녀왔어요.",
  ].join("\n");
}

function buildOrderSentence(orders, sectionIndex) {
  if (orders.length === 0) {
    return "";
  }

  if (sectionIndex === 0) {
    return `이날은 ${orders.join(", ")} 중심으로 골라봤는데 처음 방문해도 고르기 어렵지 않았어요.`;
  }

  if (sectionIndex === 1 && orders.length > 1) {
    return `먹어보면서 느낀 건 ${orders[0]}뿐 아니라 ${orders.slice(1).join(", ")}도 같이 주문하길 잘했다는 점이에요.`;
  }

  return "";
}

function normalizeContent(content) {
  return content
    .replace(/\s+/g, " ")
    .replace(/[.!?。！？]+$/g, "")
    .trim();
}

function buildContentSentence(content, sectionIndex) {
  const detail = normalizeContent(content);
  const templates = [
    `처음에는 ${detail} 쪽이 가장 먼저 눈에 들어왔는데, 실제로 경험해보니 부담 없이 편하게 느껴졌어요.`,
    `${detail} 부분은 기대했던 것보다 자연스럽게 이어져서 이용하는 동안 크게 신경 쓸 일이 없었어요.`,
    `중간에 ${detail} 점도 느낄 수 있었고, 전체적인 흐름이 어색하지 않아서 편하게 머물렀어요.`,
    `마지막으로 ${detail} 부분까지 보고 나니 방문 전 궁금했던 점들이 어느 정도 정리되는 느낌이었어요.`,
  ];

  return templates[sectionIndex];
}

function buildPreBodySections(locationDetail, interiorDetail) {
  const sections = [];

  if (locationDetail) {
    const detail = normalizeContent(locationDetail);
    sections.push([
      "[위치]",
      `찾아가는 길은 ${detail} 쪽을 참고하면 이해하기 쉬웠어요. 처음 방문하는 입장에서도 동선을 크게 헤매지 않아서 편하게 도착할 수 있었어요.`,
    ].join("\n"));
  }

  if (interiorDetail) {
    const detail = normalizeContent(interiorDetail);
    sections.push([
      "[내부모습]",
      `안으로 들어가면 ${detail} 느낌이 먼저 보였어요. 전체적으로 부담스럽게 꾸민 분위기보다는 편하게 앉아서 시간을 보내기 좋은 쪽에 가까웠어요.`,
    ].join("\n"));
  }

  return sections;
}

function buildSection(content, keywords, orders, sectionIndex) {
  const keywordText = keywords[sectionIndex] || "";
  const keywordSentence = keywordText
    ? `이 부분에서 ${keywordText} 느낌이 자연스럽게 떠올라서 기억에 남았어요.`
    : "";
  const orderSentence = buildOrderSentence(orders, sectionIndex);

  return [
    `[본문 ${sectionIndex + 1}]`,
    buildContentSentence(content, sectionIndex),
    orderSentence,
    `${keywordSentence} 처음 가는 분들도 부담 없이 참고하기 좋은 포인트였고, 친구랑 이야기하듯 편하게 추천할 수 있는 분위기였어요.`,
  ].filter(Boolean).join("\n");
}

function buildBlogPost(storeName, keywords, contents, orders, locationDetail, interiorDetail) {
  const sections = contents.map((content, index) => buildSection(content, keywords, orders, index));
  const preBodySections = buildPreBodySections(locationDetail, interiorDetail);

  return [
    "[제목]",
    `${storeName} 다녀온 솔직 후기, 편하게 추천하고 싶은 곳이에요`,
    "",
    "[도입문]",
    buildIntro(storeName, keywords),
    "",
    ...preBodySections.flatMap((section) => [section, ""]),
    sections[0],
    "",
    sections[1],
    "",
    sections[2],
    "",
    sections[3],
    "",
    "[마무리]",
    `전체적으로 ${storeName}은 과하게 꾸민 느낌보다 실제로 이용하기 편한 점이 더 잘 느껴지는 곳이었어요. 다음에 근처에 갈 일이 있으면 한 번 더 들러보고 싶어요.`,
  ].join("\n");
}

generateButton?.addEventListener("click", () => {
  const storeName = document.querySelector("#store-name").value.trim();
  const orders = getFieldValues("[id^='order-']").filter(Boolean);
  const locationDetail = document.querySelector("#location-detail").value.trim();
  const interiorDetail = document.querySelector("#interior-detail").value.trim();
  const keywords = getFieldValues("[id^='keyword-']").filter(Boolean);
  const contents = getFieldValues("[id^='content-']");
  const allValues = [storeName, ...contents];

  if (allValues.some((value) => value.length === 0)) {
    alert("가게명과 진행내용 4가지를 모두 입력해주세요.");
    return;
  }

  const repeatedKeyword = keywords.find((keyword, index) => keywords.indexOf(keyword) !== index);

  if (repeatedKeyword) {
    alert("각 키워드는 서로 다르게 입력해주세요.");
    return;
  }

  const post = buildBlogPost(storeName, keywords, contents, orders, locationDetail, interiorDetail);
  const hasAllKeywords = keywords.every((keyword) => countOccurrences(post, keyword) >= 1);

  if (!hasAllKeywords) {
    alert("필수 키워드를 모두 포함하지 못했습니다. 키워드를 다시 확인해주세요.");
    return;
  }

  generatedPost.value = post;
  characterCount.textContent = `${post.length}자`;
});
