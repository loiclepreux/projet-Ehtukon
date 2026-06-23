import { useState } from 'react';
import { useRegister } from '../../hooks/useAuth';
import { authInputStyle, authBtnStyle } from '../../lib/styles';

interface Props { onSuccess: () => void; }

export function RegisterForm({ onSuccess }: Props) {
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const register = useRegister();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    register.mutate({ nom, email, password }, { onSuccess });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <input type="text" value={nom} onChange={(e) => setNom(e.target.value)}
        required minLength={2} placeholder="Nom complet" style={authInputStyle} />
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
        required placeholder="Adresse email" style={authInputStyle} />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
        required minLength={8} placeholder="Mot de passe (8 min)" style={authInputStyle} />
      {register.error && <p className="text-red-400 text-sm mt-2">Erreur. Email déjà utilisé ?</p>}
      <button type="submit" disabled={register.isPending} style={authBtnStyle}
        onMouseOver={e => (e.currentTarget.style.backgroundColor = '#ce5867')}
        onMouseOut={e => (e.currentTarget.style.backgroundColor = '#95acc4')}
      >
        {register.isPending ? 'Inscription...' : "S'inscrire"}
      </button>
    </form>
  );
}
