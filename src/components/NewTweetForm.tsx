import { useSession } from "next-auth/react";
import { Button } from "./Button";
import { ProfileImage } from "./ProfileImage";
import { FormEvent, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { api } from "~/utils/api";

//automatic resizing of textarea by using the scrollHeight property
function updateTextAreaSize(textArea?: HTMLTextAreaElement) {
    if (textArea == null) return;
    textArea.style.height = "0px";
    textArea.style.height = `${textArea.scrollHeight}px`;
}
//If not authenticated dont render anything at all. (in order to avoid useLayourEffect error)
export function NewTweetForm(){
    const session = useSession();
    if (session.status !== "authenticated") return;

    return <Form />
}

function Form() {
    const session = useSession();
    const [inputValue, setInputValue] = useState("")
    const textAreaRef = useRef<HTMLTextAreaElement>();
    const inputRef = useCallback((textArea: HTMLTextAreaElement) => 
    {
        updateTextAreaSize(textArea);
        textAreaRef.current = textArea;
    }, []);
    
    useLayoutEffect(() => {
        updateTextAreaSize(textAreaRef.current);
    }, [inputValue]);

    const createTweet = api.tweet.create.useMutation({
        onSuccess: (newTweet) =>{
            console.log(newTweet);
            
        },
    });
    
    if (session.status !== "authenticated") return;

    function handleSubmit(e: FormEvent) {
        e.preventDefault();

        createTweet.mutate({ content: inputValue });
    }

    return(
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 border-b px-4 py-2">
            <div className="flex gap-4">
                <ProfileImage src={session.data.user.image} />  
                {/* <ProfileImage src="https://cdn.discordapp.com/avatars/422025419621924885/65f17e0752f18b223f93f74d92e52891" />        */}
                {/* Overflow hidden to helps with automatic resizing */}
                
                <textarea 
                ref = {inputRef}
                style = {{height: 0}}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-grow resize-none
                overflow-hidden p-4 text-lg outline-none"
                placeholder="What's happening?">
                </textarea>
            </div>
            {/* "self-end" Tailwind class to push tweet button to the far right */}
            <Button className="self-end"> Post! </Button>
        </form>
    );

    
}

