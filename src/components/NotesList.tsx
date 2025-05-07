import { searchNotes } from "@/lib/searchNotes";
import { useStore } from "../store/useStore";
import FoldersPopover from "./FoldersPopover";
import ExpandedNoteCard from "./ExpandedNoteCard";
import React, { useState, useRef } from "react";

const NotesList = () => {
  const {
    notes,
    searchQuery,
    selectedFolderId,
    expandedNoteId,
    setExpandedNoteId,
  } = useStore();

  const [isAnimating, setIsAnimating] = useState(false);
  const [animationStyle, setAnimationStyle] = useState<React.CSSProperties>({});
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const filteredNotesByFolder = notes.filter(
    (note) => selectedFolderId === "all" || note.folderId === selectedFolderId
  );
  const filteredNotes = searchNotes(
    filteredNotesByFolder,
    searchQuery.toLowerCase()
  );

  const handleCardClick = (noteId: string) => {
    if (expandedNoteId || isAnimating) return;

    const cardElement = cardRefs.current[noteId];
    if (cardElement) {
      const rect = cardElement.getBoundingClientRect();
      setAnimationStyle({
        "--card-original-x": `${rect.left}px`,
        "--card-original-y": `${rect.top}px`,
        "--card-original-width": `${rect.width}px`,
        "--card-original-height": `${rect.height}px`,
      } as React.CSSProperties);
      setExpandedNoteId(noteId);
    }
  };

  const handleClose = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setExpandedNoteId(null);
      setIsAnimating(false);
    }, 200);
  };

  return (
    <div className="relative font-kalam">
      {/* Overlay */}
      {expandedNoteId && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 transition-opacity duration-200"
          onClick={handleClose}
        />
      )}

      <div className="grid grid-cols-[repeat(auto-fill,minmax(208px,1fr))] gap-4 p-4">
        {filteredNotes.map((note) => {
          const isActiveNote = expandedNoteId === note.id;

          return (
            <div
              key={note.id}
              ref={(el) => (cardRefs.current[note.id] = el)}
              className={`relative transition-all duration-200 ${
                isActiveNote ? "z-20" : "z-0"
              }`}
              style={{
                height: isActiveNote || isAnimating ? "8rem" : "auto",
                ...(isActiveNote ? animationStyle : {}),
              }}
            >
              <div
                style={{
                  backgroundColor: note.color || "#fff475",
                }}
                className={`
                  rounded cursor-pointer overflow-hidden
                  ${
                    isActiveNote
                      ? "fixed inset-0 m-auto w-[600px] max-w-[90vw] h-[400px] max-h-[80vh] shadow-xl p-6 animate-expand"
                      : "relative w-full h-32 py-2 px-3"
                  }
                  ${isAnimating && !isActiveNote ? "animate-close" : ""}
                `}
                onClick={() => !isActiveNote && handleCardClick(note.id)}
              >
                {isActiveNote || isAnimating ? (
                  <ExpandedNoteCard note={note} />
                ) : (
                  <div className="flex flex-col gap-3 h-full">
                    <p className="font-medium truncate">
                      {note.title || "Untitled Note"}
                    </p>
                    <div
                      dangerouslySetInnerHTML={{ __html: note.content }}
                      className="truncate flex-grow"
                    />
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="flex flex-row items-center justify-between w-[90%] absolute bottom-2"
                    >
                      <span className="text-xs">
                        {new Date(note.updatedAt).toLocaleString()}
                      </span>
                      <FoldersPopover note={note} />
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NotesList;