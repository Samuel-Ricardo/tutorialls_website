# 09 — Backup de Segurança

| Campo | Valor |
|---|---|
| **Data do backup** | 18 de agosto de 2026 |
| **Atualização** | 19 de agosto de 2026 — adicionado `repo_full.bundle` (retenção git nativa à prova de bala) |
| **Status** | Concluído — backup executado e verificado |
| **Projeto** | `Samuel-Ricardo/tutorialls_website` |
| **Destino do backup** | `C:\Users\Desktop\tutorialls_backup` |
| **Documentos relacionados** | [07-findings.md](07-findings.md), `tutorialls_backup/README.md` |

## Por que este backup existe

O projeto local `tutorialls_website` será removido do disco C: para liberar espaço (~2,1 GB livres no momento do backup). Antes da remoção, foi verificada a sincronização com o GitHub:

- **8 branches locais** estavam 100% sincronizados com o remoto — working tree limpo, zero commits locais únicos. Nenhum código-fonte precisou ser copiado;
- **Únicos dados ausentes do GitHub:** 7 stashes (`stash@{0}`..`stash@{6}`, do lint-staged) e 2 arquivos de ambiente gitignored;
- Esses dados foram empacotados em **9 arquivos (386.934 bytes)** em `C:\Users\Desktop\tutorialls_backup` em 18/08/2026.
- Em **19/08/2026**, a retenção foi elevada à prova de bala com a criação do `repo_full.bundle` (16.794.963 bytes) — bundle git nativo contendo **todo o histórico local**, incluindo os 444 commits órfãos — ver seção [Retenção à prova de bala](#retenção-à-prova-de-bala--bundle-git-nativo).

Este documento registra oficialmente o backup e o procedimento de restauração, dando continuidade à série de documentação técnica publicada em `docs/01..08`. O inventário completo (tabela com tamanhos) não é repetido aqui — consulte o `README.md` dentro da pasta do backup.

### Critérios verificados antes do backup

A decisão de não copiar o código-fonte foi baseada nos seguintes critérios objetivos:

1. **`git status` limpo** em todos os 8 branches locais (sem alterações não commitadas);
2. **Zero commits locais únicos** — nada existia localmente que já não estivesse publicado no remoto;
3. **`git stash list`** confirmou exatamente 7 stashes, todos nomeados `lint-staged automatic backup` — o único trabalho em progresso existente;
4. **Arquivos de ambiente confirmados como gitignored** (`.env` e `.env.local`) — ausentes do histórico do repositório.

Qualquer desvio desses critérios teria exigido incluir mais conteúdo no backup.

## Dados preservados

| Dado | Origem | Impacto da perda |
|---|---|---|
| `.env` e `.env.local` | gitignored; contêm `JWT_SECRET`, `ENCRYPTION.KEY`, credenciais Sanity (`PROJECT_ID`/`DATASET`) e URLs de API | Perda permanente — recriação manual de todas as credenciais |
| `stash_0.patch` .. `stash_6.patch` | Stashes `stash@{0}`..`stash@{6}` do lint-staged ("lint-staged automatic backup") | Trabalho em progresso irrecuperável |
| `repo_full.bundle` | Bundle git nativo (`git bundle create --all`) com refs temporárias cobrindo os 444 commits órfãos do reflog/fsck | Clone completo do histórico local em formato nativo — inclui branches, tags, stashes e órfãos |

O `stash_0.patch` contém WIP de `tutorial.gateway.ts`, `env.config.ts`, specs E2E, configs do Jest, `package.json` e dados do PostgreSQL local (`.docker/data/db`).

> **Relação com o [07-findings.md](07-findings.md):** o achado **F-01** registra que o diretório de dados do PostgreSQL (`.docker/data/db`, ~62 MB) foi commitado deliberadamente no repositório. O WIP do `stash_0.patch` reforça esse ponto: ao restaurar, avalie se esses dados devem permanecer fora do controle de versão (recomendação do F-01: remover do índice + gitignore).

## Retenção à prova de bala — bundle git nativo

Criado em **19/08/2026** para garantir que **nenhum objeto git local se perca** com a remoção do projeto — inclusive os 444 commits órfãos que nem o reflog nem o GitHub alcançam.

| Campo | Valor |
|---|---|
| **Arquivo** | `C:\Users\Desktop\tutorialls_backup\repo_full.bundle` |
| **Tamanho** | 16.794.963 bytes (~16,0 MB) |
| **Formato** | Git bundle nativo (transportável como repositório completo) |
| **Validação** | `git bundle verify` → `repo_full.bundle is okay` ✅ |

### O que o bundle contém (466 refs)

| Refs | Qtd | Conteúdo |
|---|---|---|
| `refs/heads/*` | 8 | Todas as branches locais (main, develop, 6 features) |
| `refs/tags/*` | 3 | `0.1.0`, `0.2.0`, `1.0.0` |
| `refs/stash` | 1 | Cadeia dos 7 stashes (`stash@{0}`..`stash@{6}`) |
| `refs/tmp/*` | 444 | **Commits órfãos** (reflog + `fsck --unreachable`) — todos WIP/index do lint-staged, retidos de forma nativa |
| `refs/remotes/*` | 10 | Tracking das refs remotas (`origin/*`) |

> **Por que 444 refs temporárias?** `git bundle --all` sozinho empacota apenas objetos **alcançáveis** por refs. Os 444 commits órfãos não são alcançáveis por nenhuma ref — por isso cada um recebeu uma ref `refs/tmp/N` antes do `git bundle create --all` e, após a criação, as refs temporárias foram removidas (`refs/tmp` restante = 0). O bundle ficou com todos os objetos; o repositório original permaneceu intacto (working tree limpo, 7 stashes preservados).

### Restauração a partir do bundle

```bash
# Opção 1 — clonar direto do bundle (recria repo com histórico completo)
git clone C:\Users\Desktop\tutorialls_backup\repo_full.bundle tutorialls_website

# Opção 2 — ou, em um clone existente, puxar tudo do bundle
git fetch C:\Users\Desktop\tutorialls_backup\repo_full.bundle 'refs/heads/*:refs/heads/*'
```

Os commits órfãos ficam disponíveis como refs `tmp/*` — consulte com `git for-each-ref refs/tmp` e remova quando não forem mais necessários (`git update-ref -d refs/tmp/N`).

## Procedimento de restauração

Resumo executivo — comandos completos no `README.md` do backup:

1. `git clone https://github.com/Samuel-Ricardo/tutorialls_website.git` — ou `git clone C:\Users\Desktop\tutorialls_backup\repo_full.bundle tutorialls_website` para obter também stashes e órfãos
2. Para cada patch (`stash_0.patch` → `stash_6.patch`): `git apply stash_i.patch` e revisar com `git status`/`git diff`
3. **Resolver conflitos manualmente** — os patches contêm WIP antigo e podem não aplicar limpo no código atual
4. `git commit` do que for aproveitado
5. Copiar `.env` e `.env.local` para `tutorialls/`
6. `npm install && npm run dev`
7. (Opcional) Stashes com conteúdo nativo: `git stash list` no clone a partir do bundle — aplicar com `git stash apply stash@{i}`

**Atenção:** os patches são arquivos planos (não há repositório original para `git stash apply`) — devem ser aplicados exclusivamente com `git apply`.

A aplicação dos patches acontece **antes** da cópia dos `.env`, pois alguns patches podem tocar arquivos de configuração que dependem de variáveis de ambiente; com os arquivos no lugar, o `npm install` e o `npm run dev` já executam com as credenciais corretas.

## Verificação de integridade

O `README.md` do backup contém um script PowerShell que confere a presença dos 9 arquivos originais e o tamanho (maior que 0 bytes) de cada `.patch`. **Resultado esperado: 9/9 OK.**

Para o bundle: `git bundle verify C:\Users\Desktop\tutorialls_backup\repo_full.bundle` — esperado: `repo_full.bundle is okay`.

Em caso de falha (arquivo ausente ou vazio), não prossiga com a remoção do projeto local até entender a causa — um `.patch` corrompido significa WIP irrecuperável.

## Segurança

- **Não versionar os `.env`:** além da regra de gitignore, os achados **F-02** (segredos no bundle do cliente) e **F-01** (banco de dados commitado) já apontam riscos de exposição nesta base — reforce a disciplina.
- **Rotacionar segredos sob suspeita:** `JWT_SECRET`/`ENCRYPTION.KEY` e credenciais de API devem ser regenerados se o backup for exposto ou compartilhado por canal inseguro.
- **Manter `tutorialls_backup` fora de repositórios git.**
- **Validar `git status` após restaurar:** os `.env` não podem aparecer como untracked no clone.

## Referências

- `C:\Users\Desktop\tutorialls_backup\README.md` — inventário completo, passo a passo detalhado e script de verificação
- `C:\Users\Desktop\tutorialls_backup\repo_full.bundle` — retenção git nativa à prova de bala (466 refs, verificado em 19/08/2026)
- [07-findings.md](07-findings.md) — F-01 (PostgreSQL commitado no git), F-02 (segredos no bundle)
- `docs/01..08` — série de documentação técnica do projeto
- Repositório: <https://github.com/Samuel-Ricardo/tutorialls_website>

## Histórico do documento

| Data | Mudança |
|---|---|
| 18/08/2026 | Criação — registro do backup de segurança pré-remoção do projeto local |
| 19/08/2026 | Atualização — criação do `repo_full.bundle` (444 órfãos + stashes em formato git nativo) e integração ao guia de restauração |