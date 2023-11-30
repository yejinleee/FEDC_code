// 이건 서버리스 함수임

import axios from 'axios';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const { APIKEY, USERNAME } = process.env;
console.log(APIKEY, USERNAME);

interface RequestBody {
  path: '' | 'deletions' | 'reorder';
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  data: {
    [key: string]: unknown;
  };
} // 전부다 선택속성일때 각각 ? 달아도 되고, Partial 이란  유틸리티타입써도됨.

export default async function (req: VercelRequest, res: VercelResponse) {
  const { path = '', method = 'GET', data } = req.body as Partial<RequestBody>;
  // 구조분해로 data란 값을 꺼낼수 있지만, 위의 data와 중복이므로 responseValue라고 변경하는 것
  const { data: responseValue } = await axios({
    url: `https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/${path}`,
    method,
    headers: {
      'content-type': 'application/json',
      apikey: APIKEY,
      username: USERNAME,
    },
    data,
  });
  res.status(200).json(responseValue);
}
