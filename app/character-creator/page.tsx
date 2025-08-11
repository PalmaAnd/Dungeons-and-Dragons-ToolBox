"use client"

import { CharacterCreator } from "@/components/character-creator";
import characterData from "@/data/character.json";
import enhancedCharacterData from "@/data/enhanced-character.json";
import {useEffect, useState } from "react";

export default function CharacterCreatorPage() {
    const [showWip, setShowWip] = useState(true);

    // Prevent background scroll when modal is open
    useEffect(() => {
        if (showWip) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [showWip]);

    return (
        <>
            {showWip && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100vw",
                        height: "100vh",
                        background: "rgba(0,0,0,0.4)",
                        zIndex: 1000,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <div
                        style={{
                            background: "red",
                            borderRadius: 8,
                            padding: "2rem",
                            maxWidth: 400,
                            boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
                            textAlign: "center",
                        }}
                        role="dialog"
                        aria-modal="true"
                    >
                        <h2 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: 12 }}>
                            Character Creator (WIP)
                        </h2>
                        <p style={{ marginBottom: 18 }}>
                            The character creator is still a work in progress and not yet finished. Features may be missing or incomplete.
                        </p>
                        <button
                            style={{
                                background: "#222",
                                color: "#fff",
                                border: "none",
                                borderRadius: 4,
                                padding: "0.5rem 1.2rem",
                                fontWeight: 600,
                                cursor: "pointer",
                            }}
                            onClick={() => setShowWip(false)}
                            autoFocus
                        >
                            OK
                        </button>
                    </div>
                </div>
            )}
            <div className="container mx-auto py-6">
                <CharacterCreator
                    characterData={characterData}
                    enhancedData={enhancedCharacterData}
                />
            </div>
        </>
    );
}
