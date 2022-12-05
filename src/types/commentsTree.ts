export class CommentNode {
    id: number;
    parent: number;
    author: string;
    text: string;
    children: CommentList
    constructor(id: number, parent: number, author: string, text: string, comments: CommentNode[] = new Array()) {
        this.id = id;
        this.parent = parent;
        this.author = author;
        this.text = text;
        this.children = new CommentList(id, comments);
    };
}


export class CommentList {
    comments: CommentNode[];
    id: number;
    constructor(id: number, comments: CommentNode[]) {
        this.comments = comments;
        this.id = id;
    }

    add(parent: number, author: string, text: string) {
        if (parent === -1) {
            this.comments.push(new CommentNode(++this.id, -1, author, text))
            return;
        }
        const parentNode = this.findParent(parent);
        if (parentNode !== undefined)
            parentNode.children.comments.push(new CommentNode(++this.id, parentNode.id, author, text));
    }

    findParent(parentId: number): CommentNode | undefined {
        let parent: CommentNode | undefined = undefined;
        for (let i = 0; i < this.comments.length; i++) {
            if (this.comments[i].id === parentId)
                return this.comments[i];
            if (this.comments[i].children.comments.length) {
                parent = this.comments[i].children.findParent(parentId);
            }
            if (parent !== undefined)
                return parent;
        }

        return parent;
    }
}