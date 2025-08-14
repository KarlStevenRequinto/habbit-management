import React from "react";

interface PrimaryBtnProps {
    onClick: () => void;
    btnClass?: string;
    btnText: string;
}

const PrimaryBtn = ({ onClick, btnClass, btnText }: PrimaryBtnProps) => {
    return (
        <button className={`btn btn-outline btn-primary ${btnClass}`} onClick={onClick}>
            {btnText}
        </button>
    );
};

export default PrimaryBtn;
