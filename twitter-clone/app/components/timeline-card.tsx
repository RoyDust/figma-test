import { LikeButton } from "@/components/like-button";

type TimelinePost = {
  id: string;
  content: string;
  createdAt: Date;
  likeCount: number;
  viewerHasLiked: boolean;
  author: {
    id: string;
    name: string;
    username: string;
    image: string | null;
  };
};

export function TimelineCard({
  post,
  isLoggedIn,
}: {
  post: TimelinePost;
  isLoggedIn: boolean;
}) {
  return (
    <article className="rounded-[2rem] border border-slate-200 bg-white/90 p-5 shadow-[0_24px_60px_-44px_rgba(15,23,42,0.65)] backdrop-blur">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-100 text-sm font-semibold uppercase text-sky-700">
          {post.author.name.slice(0, 1)}
        </div>
        <div>
          <p className="font-semibold text-slate-900">{post.author.name}</p>
          <p className="text-sm text-slate-500">@{post.author.username}</p>
        </div>
      </div>

      <p className="mt-4 whitespace-pre-wrap text-[15px] leading-7 text-slate-800">
        {post.content}
      </p>

      <div className="mt-5 flex items-center justify-between gap-4">
        <p className="text-sm text-slate-500">
          {new Intl.DateTimeFormat("zh-CN", {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }).format(new Date(post.createdAt))}
        </p>
        <div className="flex items-center gap-3">
          <span className="text-sm text-slate-500">{post.likeCount} 赞</span>
          <LikeButton
            postId={post.id}
            liked={post.viewerHasLiked}
            disabled={!isLoggedIn}
          />
        </div>
      </div>
    </article>
  );
}
