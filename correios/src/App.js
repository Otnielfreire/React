import React, { useState } from 'react';

const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Arial, sans-serif'
  },
  header: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  input: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxSizing: 'border-box',
    fontSize: '16px',
  },
  button: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    marginTop: '10px',
    transition: 'background-color 0.3s ease',
  },
  buttonDisabled: {
    backgroundColor: '#6c757d',
    cursor: 'not-allowed',
  },
  error: {
    color: 'red',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  result: {
    marginTop: '20px',
  },
  resultItem: {
    marginBottom: '10px',
    fontSize: '16px',
  },
};

const CepSearch = () => {
  const [cep, setCep] = useState('');
  const [address, setAddress] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const validateCep = (cep) => {
    const regex = /^\d{5}-\d{3}$/;
    return regex.test(cep);
  };

  const handleSearch = async () => {
    if (!validateCep(cep)) {
      setError('CEP inválido. O formato deve ser XXXXX-XXX');
      return;
    }
    
    setError(null);
    setAddress(null);
    setLoading(true);

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      if (!response.ok) {
        throw new Error('CEP não encontrado');
      }
      const data = await response.json();
      setAddress(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Consulta de CEP</h2>
      <input
        type="text"
        value={cep}
        onChange={(e) => setCep(e.target.value)}
        placeholder="Digite o CEP (XXXXX-XXX)"
        maxLength="9"
        style={styles.input}
      />
      <button 
        onClick={handleSearch} 
        disabled={loading} 
        style={{ ...styles.button, ...(loading ? styles.buttonDisabled : {}) }}
      >
        {loading ? 'Buscando...' : 'Buscar'}
      </button>

      {error && <p style={styles.error}>{error}</p>}

      {address && !error && (
        <div style={styles.result}>
          <h3>Resultado:</h3>
          <p style={styles.resultItem}><strong>CEP:</strong> {address.cep}</p>
          <p style={styles.resultItem}><strong>Logradouro:</strong> {address.logradouro}</p>
          <p style={styles.resultItem}><strong>Bairro:</strong> {address.bairro}</p>
          <p style={styles.resultItem}><strong>Cidade:</strong> {address.localidade}</p>
          <p style={styles.resultItem}><strong>Estado:</strong> {address.uf}</p>
        </div>
      )}
    </div>
  );
};

export default CepSearch;
