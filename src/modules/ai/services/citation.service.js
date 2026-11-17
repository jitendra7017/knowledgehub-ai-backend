class CitationService {

    build(matches) {

        return matches.map(match => ({

            score: match.score,

            title: match.metadata.title,

            documentId:
                match.metadata.documentId,

            chunkIndex:
                match.metadata.chunkIndex

        }));

    }

}

export default new CitationService();