interface MinMaxButtonProps {
    children: JSX.Element | JSX.Element[];
}

const MinMaxButton: React.FC<MinMaxButtonProps> = ({
    children
}) => {
    return (
        <div className="bg-[#0F1012] p-[5px] md:p-[9px] rounded-full flex flex-row gap-1 items-stretch">
            {children}
        </div>
    );
};

export default MinMaxButton;
