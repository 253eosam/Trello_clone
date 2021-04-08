
export default {
  // Board
  getBoard: () => '/boards',
  postBoard: () => '/boards',
  deleteBoard: ({ id }) => `/boards/${id}`,
  putBoard: ({ id }) => `/boards/${id}`,

  // Board > BList
  getBList: ({ id }) => `/b-lists/${id}`,
  postBList: () => '/b-lists',
  deleteBList: ({ id }) => `/b-lists/${id}`,
  putBList: ({ id }) => `/b-lists/${id}`,

  // Board > BList > Card
  getCard: ({ id }) => `/cards/${id}`,
  postCard: () => '/cards',
  deleteCard: ({ id }) => `/cards/${id}`,
  putCard: ({ id }) => `/cards/${id}`,

  // User
  getUser: () => '/users',
  postUser: () => '/users',
  deleteUser: ({ id }) => `/users/${id}`,
  putUser: ({ id }) => `/users/${id}`

}
