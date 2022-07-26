import Form from 'react-bootstrap/Form';
import resultStyle from './Results.module.css'
import { useSelector } from 'react-redux'

function Results() {
    const results = useSelector( state => state.textReversed)
  return (
      <div className={resultStyle.container}>
          <h3>Results:</h3>
        <div className={resultStyle.container_imputs}>
        <Form.Group className="mb-3">
            {results.map((result, i) => (
                <div key={results.lenth-i}>
                    {result?.palindromo?
                    <Form.Label 
                    className={resultStyle.palindromo}>texto {results.length-(i)} es palindromo</Form.Label>:
                    <Form.Label 
                    className={resultStyle.noPalindromo}>texto {results.length-(i)} no es palindromo</Form.Label>}
                    <Form.Control value={result.text}/>
                </div>
            ))}
        </Form.Group>

        </div>
      </div>
  );
}

export default Results;
