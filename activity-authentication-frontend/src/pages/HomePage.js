import { useNavigate } from 'react-router';

function HomePage() {
  const navigate = useNavigate();

  function goToLoginPage() {
    navigate('/');
  }

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-slate-50">
      <div className="text-3xl font-bold text-slate-500 text-center mb-8">
        Welcome to this generic app!
      </div>
      <button
        onClick={goToLoginPage}
        className="bg-pink-400 text-white px-6 py-2 rounded-lg font-semibold hover:bg-pink-300"
      >
        Logout
      </button>
    </div>
  );
}

export default HomePage;
