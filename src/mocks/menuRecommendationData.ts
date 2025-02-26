export const menuRecommendationData = {
  name: '짜장면',
  imageUrl: 'https://github.com/shadcn.png',
  accuracy: 78.3,
}

/**
 * 이렇게 오는 형식을 카멜 케이스로 바꿔줘야함
[
    {
      "place_name": "카카오프렌즈 코엑스점",
      "distance": 418,
      "road_address_name": "서울 강남구 영동대로 513",
      "place_url": "http://place.map.kakao.com/26338954",
      "image_url": "http://~~"
    },

  ]
    
 */

export const storeRecommendationData = Array.from(
  { length: 15 },
  (_, index) => ({
    placeName: `카카오프렌즈 코엑스점 ${index}`,
    distance: 418,
    roadAddressName: '서울 강남구 영동대로 513',
    placeUrl: 'http://place.map.kakao.com/26338954',
    imageUrl: 'https://github.com/shadcn.png',
  }),
)
