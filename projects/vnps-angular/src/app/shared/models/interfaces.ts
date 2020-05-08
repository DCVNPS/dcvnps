import { AnnouncementsModule } from '../../announcements/announcements.module';

export interface Photo {
    photoId: string;
    galleryId: string;
    gallery: string;
    imgalt: string;
    imgsrc: string;
    portrait: boolean;
    hidden: boolean;
}

export interface Gallery {
    galleryId: string;
    gallery: string;
    oldGalleryName?: string;
    photoFile?: File;
    profilePhoto?: string;
    activeInd?: string;
    adminRole?: string;
    updatedUserId?: string;
    createdDate?: Date;
    updatedDate?: Date;
}

export interface VnpsClassesMenu {
    id: string;
    level: string;
    description: string;
}

export interface VnpsClass {
    classId?: string;
    classLevel: string;
    classLevelDesc: string;
    classOrder?: number;
    classDescription: string;
    prerequisite: string;
    curriculum: string;
    instructors: string;
    postedUserId?: string;
    postedBy?: string;
    postedDate?: Date;
    updatedUserId?: string;
    updatedBy?: string;
    updatedDate?: Date;
}

export interface AuthorPhotos {
    author: string;
    year: string;
    gallery?: string;
    photos: Array<Photo>;
}

export interface GalleryData {
    years: Array<string>;
    authorData: Array<AuthorPhotos>;
}

export interface  Announcement {
    announcementId?: string;
    title: string;
    content: string;
    postedBy?: string;
    postedDate?: Date;
    updatedBy?: string;
    updatedDate?: Date;
}

export interface Announcements {
    announcements: Array<Announcement>;
}

export interface Person {
    lastName: string;
    firstName: string;
    middleName: string;
    tittle: string;
}

export interface BoardMember {
    lastName: string;
    firstName: string;
    middleName: string;
    tittle: string;
}

export interface PaginationConfig {
    initPage: number;
    itemPerPage: number;
}

export interface User {
    userId?: string;
    email: string;
    password: string;
    userSurname: string;
    userGivenName: string;
    roleCode?: string;
    roleDescription?: string;
    activeInd?: string;
    createdUserId?: string;
    createdDate?: Date;
    updatedUserId?: string;
    updatedDate?: Date;
}

export interface Role {
    roleCode: string;
    roleDescription: string;
}

export interface EditUserData {
    users: User;
    roles: Role[];
  }

export interface AdminLevel {
    role: string;
    level: string;
}

export interface ImageInfo {
    galleryid?: string;
    gallery?: string;
    imgFile: File;
    reviewUrl?: string | ArrayBuffer;
    filename: string;
    author: string;
    year?: string;
    size: number;
    portrait?: boolean;
    uploaded?: boolean;
  }

export interface DropzoneConfig {
    gallery?: string;
    galleryId: string;
    year?: string;
}
