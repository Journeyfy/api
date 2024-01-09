export interface SlimDestinationDto {
    idDestination: number;
    name: string;
    popularity?: number;
}

export interface DestinationDto extends SlimDestinationDto {
    image?: string;
}