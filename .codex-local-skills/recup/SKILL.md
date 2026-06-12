---
name: recup
description: "Generate a copy-paste session handoff in French so work can continue in a new conversation without losing context. Use when the user types `/recup`, asks for a brief de passation, session recap, handoff, continuity brief, or wants to stop here and resume later. This skill is for technical continuity across chats: code, infra, deployment, debugging, configuration, content work, and decision tracking."
license: Apache-2.0
metadata:
  source: "Adapted from C:\\Users\\Administrator\\.claude\\skills\\recup"
---

# Recup

Produce a handoff that can be pasted as the first message of a new conversation.

## Goal

Do not summarize the chat chronologically.
Freeze the current working state so a fresh Codex instance can restart with minimal rediscovery.

## What To Capture

Always capture, when available:
- project context
- user work preferences
- stable environment facts
- architecture and file locations
- done vs remaining work
- confirmed pitfalls
- useful links
- the single next concrete action
- uncertainties that still need confirmation

## Writing Rules

- Write in French unless the current session clearly uses another language.
- Focus on current state, not story.
- Prefer exact paths, file names, URLs, commands, and decisions.
- Separate confirmed facts from assumptions.
- If information is missing, put it in `Incertitudes / à vérifier`.
- Output the whole handoff inside one fenced code block.
- Keep exactly one `Prochaine action`.

## Sources

Primary source:
- the current conversation

Secondary source when available in the environment:
- local files changed in the session
- git state
- any explicit notes or memory artifacts the user already maintains

Do not claim to have searched historical chat memory unless that capability is actually available in the current tool context.

## Output Template

Use exactly this structure:

```text
# Reprise de session - <sujet en quelques mots>
> Colle ce brief comme premier message d'une nouvelle conversation pour repartir sans perte de contexte.

## Contexte
<1 a 3 phrases>

## Consignes de travail
<preferences de travail de l'utilisateur>

## Infrastructure / environnement
<faits stables>

## Architecture
<carte mentale du systeme>

## Etat d'avancement
**Fait**
- <realise et valide>

**Reste a faire**
- <reste a faire>

## Pieges valides
- <piege confirme> -> <contournement>

## Liens et references
- <url ou chemin> - <usage>

## Prochaine action
<une seule action concrete>

## Incertitudes / a verifier
- <point non confirme>
```

## Decision Rules

- If a section has no real content, keep it concise rather than inventing filler.
- If there are no uncertainties, omit that final section.
- If the user asks for `/recup`, prioritize usefulness for restart over elegance.
- If there are many threads in flight, choose the dominant thread and mention the others briefly in `Reste a faire` or `Incertitudes`.

## Quality Bar

A good `recup` should let the next conversation start working immediately without first asking:
- what project is this
- where are the files
- what was already done
- what is still blocked
- what should I do first
