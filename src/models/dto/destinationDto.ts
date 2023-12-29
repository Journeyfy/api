export interface DestinationDto {
    idDestination: number;
    name: string;
    popularity?: number;
}

export interface DestinationWithImageDto extends DestinationDto {
    image?: string;
}