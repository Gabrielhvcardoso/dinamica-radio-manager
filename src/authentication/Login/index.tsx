import React, { useContext, useState } from 'react';
import Alert from '../../components/Alert';
import { AnimatePresence } from 'framer-motion';
import { BackImage, Button, Checkbox, Container, Label, Logo, TextInput } from './styles';

import background from '../../assets/images/john-matychuk.jpg';
import { useFetch } from '../../hooks';

import AuthContext from '../../context/auth';

interface InputProps {
  key: 'email' | 'password', label: any, placeholder: any
}

const Login: React.FC = () => {
  const { setAuthStatus } = useContext(AuthContext);

  const [persistence, setPersistence] = useState<boolean>(false);
  const [form, setForm] = useState<{ email: string, password: string }>({ email: '', password: '' });
  const [errors, setErrors] = useState<{ email: boolean, password: boolean }>({ email: false, password: false });
  const [isError, setIsError] = useState<boolean>(false);

  const showError = () => {
    setIsError(true);
    setTimeout(() => setIsError(false), 5000);
  };

  const handleLogin = () => {
    let hasErrors = false;

    if (!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(form.email))) {
      hasErrors = true;
      setErrors({ ...errors, email: true });
    }

    if (!form.password.match(/[0-9]/g) || !form.password.match(/[a-zA-Z]/g) || form.password.length < 8 || form.password.length > 20) {
      hasErrors = true;
      setErrors({ ...errors, password: true });
    }

    if (!hasErrors) {
      useFetch.post('/cli/auth', {
        mail: form.email,
        password: form.password
      }, (response) => {
        if (response.code === 'success') {
          const { clientId } = response;
          setAuthStatus(clientId, persistence);
        } else {
          showError();
        }
      });
    }
  };

  const onChange = (id: 'email' | 'password', value: string) => {
    if (errors[id]) setErrors({ ...errors, [id]: false });
    setForm({
      ...form,
      [id]: value
    });
  };

  const inputs: Array<InputProps> = [
    {
      key: 'email',
      label: 'Endereço de E-mail',
      placeholder: 'Seu e-mail'
    },
    {
      key: 'password',
      label: 'Palavra passe',
      placeholder: 'Sua senha'
    }
  ];

  return (
    <Container>
      <BackImage src={background} />

      {
        isError && (
          <AnimatePresence>
            <Alert>
              Não foi possível realizar o login com essas credenciais
            </Alert>
          </AnimatePresence>
        )
      }

      <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between' }}>
        <Logo />
      </div>

      <div style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: 400 }}>
          {
            inputs.map(({ key, label, placeholder }) => (
              <>
                <Label>{ label }</Label>
                <TextInput
                  type={key}
                  error={errors[key]}
                  value={form[key]}
                  onChange={(e) => onChange(key, e.target.value)}
                  placeholder={placeholder}
                />
              </>
            ))
          }

          <div style={{ alignItems: 'center', display: 'flex', margin: '10px 0px' }}>
            <Checkbox checked={persistence} onChange={e => setPersistence(e.target.checked)} id="persistence" />
            <label htmlFor="persistence">Matenha-me conectado</label>
          </div>

          <Button onClick={handleLogin}>Entrar</Button>
        </div>
      </div>
    </Container>
  );
};

export default Login;
