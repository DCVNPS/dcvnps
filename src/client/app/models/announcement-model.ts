export class Announcement {
    public announcementId: string;
    public title: string;
    public content: string;
    public postedBy: string;
    public postedDate: Date;
    public updatedBy: string;
    public updatedDate: Date;
    constructor(
        announcementId: string,
        title: string,
        content: string,
        postedBy: string,
        postedDate: Date,
        updatedBy: string,
        updatedDate: Date,
    ) {
        this.announcementId = announcementId;
        this.title = title;
        this.content = content;
        this.postedBy = postedBy;
        this.postedDate = postedDate;
        this.updatedBy = updatedBy;
        this.updatedDate = updatedDate;
    }
}
