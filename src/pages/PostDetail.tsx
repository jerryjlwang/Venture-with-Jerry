import { useParams, Link } from 'react-router-dom';
import { posts } from '../data/posts';
import { ArrowUp, ArrowLeft } from 'lucide-react';
import { ASSET_V } from '../lib/assetVersion';
import OptimizedBackground from '../components/OptimizedBackground';

const SEATTLE_SKYLINE = 'https://te-cdn-marketing-site.storage.googleapis.com/littleamerica/America/parnter/stay/places/usa-washington-state-seattle-skyline.jpg';

const PostDetail = () => {
  const { id } = useParams<{ id: string }>();
  const post = posts.find(p => p.id === id);

  if (!post) {
    return (
      <OptimizedBackground
        src={SEATTLE_SKYLINE}
        alt="Seattle skyline"
        className="min-h-screen"
        overlayClassName="bg-gradient-to-b from-black/30 via-black/30 to-slate-900"
      >
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-4xl font-courier font-bold text-white mb-4 tracking-wide">Post Not Found</h1>
            <Link to="/posts" className="text-blue-400 hover:text-blue-300 transition-colors font-courier tracking-wide">
              ← Back to Posts
            </Link>
          </div>
        </div>
      </OptimizedBackground>
    );
  }

  return (
    <div className="min-h-screen relative">
      {/* Fixed Background Image */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${SEATTLE_SKYLINE}')` }}
      />
      {/* Gradient overlay */}
      <div className="fixed inset-0 bg-gradient-to-b from-black/50 via-black/40 to-slate-900/95" />
      
      {/* Content */}
      <article className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back button */}
        <Link 
          to="/posts" 
          className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors mb-8 font-courier tracking-wide group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Back to Posts
        </Link>

        {/* Glass morphism content card */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl">
          <header className="mb-10">
            <div className="flex items-center justify-between text-sm text-blue-300 mb-4 font-courier tracking-wide">
              <time dateTime={post.date}>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
              <span>{post.readTime}</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-courier font-medium text-white mb-4 leading-tight tracking-wide">
              {post.title}
            </h1>
          </header>

          <div className="prose prose-lg prose-invert max-w-none">
            {post.graphic && (
              <div className="float-left mr-8 mb-6">
                <div className="w-56 md:w-72 rounded-xl overflow-hidden shadow-xl border border-white/10">
                  <img 
                    src={`${post.graphic}?v=${ASSET_V}`}
                    alt={`${post.title} graphic`}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            )}
            <div className="text-gray-200 leading-relaxed whitespace-pre-line font-courier tracking-normal text-lg">
              {post.content}
            </div>
          </div>

          <div className="clear-both" />

          <footer className="mt-12 pt-8 border-t border-white/10">
            <div className="flex justify-between items-center">
              <Link 
                to="/posts" 
                className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors font-courier tracking-wide group"
              >
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                Back to Posts
              </Link>
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors font-courier tracking-wide group"
              >
                <ArrowUp size={16} className="group-hover:-translate-y-1 transition-transform" />
                Back to Top
              </button>
            </div>
          </footer>
        </div>
      </article>
    </div>
  );
};

export default PostDetail;
