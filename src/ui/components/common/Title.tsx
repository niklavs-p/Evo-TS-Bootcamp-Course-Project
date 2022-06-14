interface TitleProps {
    text: string;
}

export const Title = ({ text }: TitleProps) => {
    return <div className="title">{text}</div>;
};
