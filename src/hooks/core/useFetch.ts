const BASE_URL = 'http://dmihost.com.br:21076';

export const useFetch = {
  get: (url = '/', onEnd = (data: {}) => {}) => {
    Promise.all([
      fetch(BASE_URL + url, {
        method: 'GET',
      })
    ]).then(([response]) => {
      response.json().then((data) => {
        onEnd(data);
      });
    });
  },

  post: async (url = '/', body: {}, onEnd = (data: any) => {}) => {
    fetch(BASE_URL + url + '/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body),
    }).then((response) => {
      response.json()
        .then(data => {
          onEnd(data);
        })
        .catch(() => {
          onEnd({ code: 'error' })
        });
    });
  },

  postFormData: async (url = '/', body: FormData, onEnd = (data: any) => {}) => {
    fetch(BASE_URL + url, {
      method: 'POST',
      body,
    }).then((response) => {
      response.json()
        .then(data => {
          onEnd(data);
        })
        .catch(() => {
          onEnd({ code: 'error', message: 'Erro genérico' })
        });
    });
  },

  delete: async (url = '/', onEnd = (data: any) => {}) => {
    fetch(BASE_URL + url, {
      method: 'DELETE',
    }).then((response) => {
      response.json()
        .then(data => {
          onEnd(data);
        })
        .catch((e) => {
          onEnd({ code: 'error', ...e })
        });
    });
  },

};