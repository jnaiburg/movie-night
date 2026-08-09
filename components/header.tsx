type Props = {
  id?: string;
  onCopy: () => void;
  copied: boolean;
};

export const Header = ({ id, onCopy, copied }: Props) => {
  return (
    <header>
      <a href="/">
        MOVIE NIGHT <i>✦</i>
      </a>
      <button className="share" onClick={onCopy}>
        {copied ? "Copied!" : id ? `Share ${id}` : "Copy link"}
      </button>
    </header>
  );
};
