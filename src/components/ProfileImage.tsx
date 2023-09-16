import Image from "next/image";

//make the image property optional because not everyone will have an image therefore fallback to null
type ProfileImageProps = {
    src?: string | null
    className?: string
}

//Using next/image component from React
export function ProfileImage({ src, className = "" }:
ProfileImageProps) {
  return (
    <div
        className={`relative h-12 w-12 overflow-hidden rounded-full ${className}`}>
        {src == null ? null : (
        <Image src={src} alt="Profile Image" quality={100} fill /> 
        )}
    </div>
  );
}
