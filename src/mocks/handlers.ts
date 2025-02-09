import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('https://swapi.dev/api/people/', ({ request }) => {
    const url = new URL(request.url);
    const search = url.searchParams.get('search');

    if (search === 'Luke') {
      return HttpResponse.json(
        {
          results: [
            {
              name: 'Luke Skywalker',
              height: '172',
              hair_color: 'blond',
              gender: 'male',
              url: 'https://swapi.dev/api/people/1/',
            },
          ],
          count: 1,
        },
        { status: 200 }
      );
    }

    return HttpResponse.json(
      {
        results: [],
        count: 0,
      },
      { status: 200 }
    );
  }),

  http.get('https://swapi.dev/api/people/:id', ({ params }) => {
    const { id } = params;

    if (id === '1') {
      return HttpResponse.json(
        {
          name: 'Luke Skywalker',
          height: '172',
          hair_color: 'blond',
          gender: 'male',
          url: 'https://swapi.dev/api/people/1/',
        },
        { status: 200 }
      );
    }

    return HttpResponse.json({ error: 'Person not found' }, { status: 404 });
  }),
];
