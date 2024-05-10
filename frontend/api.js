export default class APIHandler {
  constructor() {
  }

  // TODO: 전체 카드 객체 리스트 반환. 없으면 NULL
  async getCards() {
    if (this.dummyData.length === 0) {
      return null;
    } else {
      return this.dummyData;
    }
  }

  // TODO: 카드 객체 생성/추가 후 ID 반환
  async postCard(cardObj) {
    let id = Math.round(Math.random() * 10000).toString();
    this.dummyData.push({
      id: id,
      title: cardObj.title,
      category: cardObj.category
    });
    console.log(this.dummyData);
    return id;    
  }

  // TODO: ID로 카드 검색 후 내용,카테고리 수정
  async putCard(cardObj) {
    this.dummyData = this.dummyData.map(card => {
      return card.id === cardObj.id
        ? { ...card, category: cardObj.category, title: cardObj.title }
        : card;
    });
    console.log(this.dummyData)
  }

  // TODO: ID로 카드 검색 후 삭제
  async deleteCard(id) {
    this.dummyData = this.dummyData.filter(card =>{
      return card.id !== id
    });
    console.log(this.dummyData);
  }

}

const BASE_URL = "https://2x3itr9vce.execute-api.ap-northeast-2.amazonaws.com/prod"

// TODO: API 요청 컨테이너. Method, Path, Body 속성
class APIRequest {
  constructor(method, path, body = null) {
    this.method = method;
    this.url = BASE_URL + path;
    this.body = body;
  }
  
}
// TODO: API 호출 함수
const APIProcessor = async (request) => {
  const response = await fetch(request.url, {
    method: request.method,
    mode: "cors",
    cache: "no-cache",
    headers : {
      "Content-type" : "application/json",
      "Accept" : "application/json"
    },
    body: request.body ? JSON.stringify(request.body) : null

  })
}
 