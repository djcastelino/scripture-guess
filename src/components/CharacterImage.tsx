import './CharacterImage.css';

interface CharacterImageProps {
  imageUrl?: string;
  wrongGuesses: number;
  isComplete: boolean;
  characterName: string;
}

export default function CharacterImage({ 
  imageUrl, 
  wrongGuesses, 
  isComplete,
  characterName 
}: CharacterImageProps) {
  // Don't show image if no URL provided
  if (!imageUrl) return null;

  // Calculate blur amount based on wrong guesses
  // Start very blurred, get clearer with each wrong guess
  // 0 wrong = 20px blur, 1 wrong = 16px, 2 wrong = 12px, etc.
  const getBlurAmount = () => {
    if (isComplete) return 0; // Fully revealed when game is complete
    const maxBlur = 20;
    const blurReduction = 4; // Reduce blur by 4px per wrong guess
    const blur = Math.max(0, maxBlur - (wrongGuesses * blurReduction));
    return blur;
  };

  const blurAmount = getBlurAmount();

  return (
    <div className="character-image-container">
      <div className="character-image-wrapper">
        <img 
          src={imageUrl} 
          alt={isComplete ? characterName : "Mystery Character"}
          className="character-image"
          style={{
            filter: `blur(${blurAmount}px)`,
            transition: 'filter 0.5s ease-in-out'
          }}
        />
        {!isComplete && wrongGuesses < 5 && (
          <div className="image-hint">
            {wrongGuesses === 0 
              ? "🖼️ Image will get clearer with each guess" 
              : `🔍 Getting clearer... (${5 - wrongGuesses} guesses left)`
            }
          </div>
        )}
      </div>
    </div>
  );
}

