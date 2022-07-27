const chai = require('chai');
const chaiHTTP = require('chai-http');

const server = require('../src/app');

const STATUS_OK = 200;
const STATUS_NOT_FOUND = 404;
const STATUS_USER_ERROR = 422;
const STATUS_SERVER_ERROR = 500;

const PATH = '/iecho?text=';
const METHOD_GET = 'GET';
const METHOD_POST = 'POST';
const METHOD_PUT = 'PUT';
const METHOD_DELETE = 'DELETE';

// allows us to make and test HTTP requests
chai.use(chaiHTTP);

const expect = chai.expect;

/* Expects the status code expected from the given response, res. Throws
 * a useful error message if the expectation is not met. The request
 * method is used to improve error messages. */
const expectStatus = (expected, res, method) => {
  // We assume the status *isn't* expected to be STATUS_SERVER_ERROR or
  // STATUS_NOT_FOUND; in these cases, we have custom error messages that
  // help the student out (see switch statement below).
  if (expected === STATUS_SERVER_ERROR || expected === STATUS_NOT_FOUND) {
    throw new Error(
      'The expected status should be something other than ' +
      `${STATUS_SERVER_ERROR} and ${STATUS_NOT_FOUND}`
    );
  }

  switch (res.status) {
    case STATUS_SERVER_ERROR:
      throw new Error(
        `El servidor arrojó un error durante la ejecución del request ${method} ${PATH} (status code ` +
        '500)'
      );

    case STATUS_NOT_FOUND:
      throw new Error(
        `El handler para el request ${method} ${PATH} no se encuentra implementado (status ` +
        'code 404)'
      );

    default:
      if (expected !== res.status) {
        const msg = `Expected status ${expected} but got ${res.status} from ` +
          `${method} ${PATH}`;
        throw new Error(msg);
      }

      /* eslint no-unused-expressions: 0 */
      // This is the correct way to make the expectation, even though it seems odd.
      expect(res).to.be.json;

      if (expected === STATUS_USER_ERROR) {
        expect(res.body).to.have.property('error');
      }
  }
};

/* Makes a request using the given method to the provided path. If body is
 * given, sends it along with the request. Checks for the expected status. */
const req = (method, status, body = null, path = PATH) => {
  const property = method.toLowerCase();
  let request = chai.request(server)[property](path);

  if (body) {
    request = request.send(body);
  }

  return request
    .catch((err) => {
      // For status codes like 404, 500, and 422, the promise fails and contains
      // a response property in the error object. We want to rescue these cases
      // and return the response object normally. That way we can have a single
      // handler that checks status properly in all cases.
      if (err.response) {
        return err.response;
      }
      throw err;
    })
    .then((res) => {
      expectStatus(status, res, method);
      return res.body;
    });
};

/* Adds the given post object to the array of posts by making a request. Sets
 * the post object's id based on what's returned by the server. */
const addPost = (post) => {
  return req(METHOD_GET, STATUS_OK, post).then((newPost) => {
    expect(newPost).to.have.property('text').that.equals(post.title);
    expect(newPost).to.have.property('contents').that.equals(post.contents);
    expect(newPost).to.have.property('id').that.is.a('number');

    // We do this so the post object is always up-to-date. It can then be
    // compared to the existing posts during a subsequent get request.
    post.id = newPost.id;
    return post;
  });
};

describe('Invierte correctamente el texto introducido', () => {
    
  describe(`${METHOD_GET} ${PATH}`, () => {
    it('prueba 1', () => {
      return req(METHOD_GET, STATUS_OK, null, `${PATH}hello`)
        .then((postReturned) => {
          expect(postReturned.text).to.equal('olleh');
        });
    });

    it('prueba 2', () => {
        return req(METHOD_GET, STATUS_OK, null, `${PATH}anillo`)
          .then((postReturned) => {
            expect(postReturned.text).to.equal('ollina');
          });
      });

    it('prueba 3', () => {
    return req(METHOD_GET, STATUS_OK, null, `${PATH}satelite`)
        .then((postReturned) => {
        expect(postReturned.text).to.equal('etiletas');
        });
    });

  });

  

 
  
  
});

describe('Devuelve true cuando el texto es palíndromo y false cuando no es palíndromo', () => {
    
    describe(`${METHOD_GET} ${PATH}`, () => {
      it('prueba 1', () => {
        return req(METHOD_GET, STATUS_OK, null, `${PATH}amo la paloma`)
          .then((postReturned) => {
            expect(postReturned.palindromo).to.equal(true);
          });
      });
  
      it('prueba 2', () => {
          return req(METHOD_GET, STATUS_OK, null, `${PATH}anillo`)
            .then((postReturned) => {
              expect(postReturned.palindromo).to.equal(false);
            });
        });
  
      it('prueba 3', () => {
      return req(METHOD_GET, STATUS_OK, null, `${PATH}anita lava la tina`)
          .then((postReturned) => {
          expect(postReturned.palindromo).to.equal(true);
          });
      });

      it('prueba 4', () => {
        return req(METHOD_GET, STATUS_OK, null, `${PATH}lozana`)
            .then((postReturned) => {
            expect(postReturned.palindromo).to.equal(false);
            });
        });

        it('prueba 5', () => {
            return req(METHOD_GET, STATUS_OK, null, `${PATH}luz azul`)
                .then((postReturned) => {
                expect(postReturned.palindromo).to.equal(true);
                });
            });
  
    });
  });




