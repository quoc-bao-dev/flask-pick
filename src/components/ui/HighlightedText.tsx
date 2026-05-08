import React from 'react'

interface HighlightedTextProps {
  text: string
  query: string
  highlightClassName?: string
}

/**
 * HighlightedText component
 * Responsibility: Renders text with a specific query highlighted.
 */
export const HighlightedText: React.FC<HighlightedTextProps> = ({
  text,
  query,
  highlightClassName = 'text-(--color-orange-1) font-bold',
}) => {
  if (!query) return <>{text}</>

  const parts = text.split(new RegExp(`(${query})`, 'gi'))

  return (
    <>
      {parts.map((part, index) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <span key={index} className={highlightClassName}>
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </>
  )
}
