
import React from "react";
import { EmojiData } from "../../Datas/EmojiData.jsx";

function ProfessorTags({ commentTag }) {

    const tags = commentTag.map((item, index) => {
        const accessEmoji = item.replace(/ /g, "");

        console.log(accessEmoji)
        const emojiClass = EmojiData?.[accessEmoji]?.class || '';
        const emojiSymbol = EmojiData?.[accessEmoji]?.emoji || '';

        if (emojiClass && emojiSymbol){
            return (
                <li
                    key={index}
                    className={`${emojiClass} px-2 py-1 rounded-md`}
                >
                    {item} {emojiSymbol}
                </li>
            );
        }
    });

    return (
        <ul className="lg:flex hidden gap-3">
            {tags}
        </ul>
    );
}

export default ProfessorTags;
