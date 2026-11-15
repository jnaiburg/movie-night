type Props = {
  id?: string;
  onCopy: () => Promise<void>;
  copied: boolean;
  copyError: string | null;
};

export const Header = ({ id, onCopy, copied, copyError }: Props) => {
  return (
    <header>
      <a href="/">
        MOVIE NIGHT <i>✦</i>
      </a>
      <div className="share-control">
        <button className="share" onClick={onCopy}>
          {copyError ? "Copy failed" : copied ? "Copied!" : id ? `Share ${id}` : "Copy link"}
        </button>
        {copyError && (
          <span className="share-error" role="alert">
            {copyError}
          </span>
        )}
      </div>
    </header>
  );
};
