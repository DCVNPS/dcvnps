export class Announcement {
    public announcementId: string;
    public title: string;
    public content: string;
    public userId: string;
    public postedBy: string;
    public postedDate: Date;
    public updatedDate: Date;
    constructor(
        announcementId: string,
        title: string,
        content: string,
        userId: string,
        postedBy: string,
        postedDate: Date,
        updatedDate: Date,
    ) {
        this.announcementId = announcementId;
        this.title = title;
        this.content = content;
        this.userId = userId;
        this.postedBy = postedBy;
        this.postedDate = postedDate;
        this.updatedDate = updatedDate;
    }
}