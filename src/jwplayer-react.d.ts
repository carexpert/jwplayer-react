declare module '@jwplayer/jwplayer-react' {
    import jwplayer from './jwplayer';
    import type { ComponentType, HTMLProps } from 'react'
    /**
     * Example: {"2500":"High","1000":"Medium"}
     */
    type QualityLabels = Record<string, string>

    type Stretching = 'uniform' | 'exactfit' | 'fill' | 'none'

    /**
     * Width in pixels or percentage
     */
    type Width = number | string

    interface AppearanceConfig {
        aspectratio?: string
        controls?: boolean
        displaydescription?: boolean
        displayHeading?: boolean
        displayPlaybackLabel?: boolean
        displaytitle?: boolean
        height?: number
        horizontalVolumeSlider?: boolean
        nextUpDisplay?: boolean
        qualityLabels?: QualityLabels
        renderCaptionsNatively?: boolean
        stretching?: Stretching
        width?: Width
    }

    type AutoStart = 'viewable' | 'off'
    /**
     * A positive value is an offset from the start of the video.
     * A negative value is an offset from the end of the video.
     * This property can be defined either as a number (-10) or a percentage as a string ("-2%")
     */
    type NextUpOffset = string | number

    interface BehaviorConfig {
        aboutlink?: string
        abouttext?: string
        allowFullscreen?: boolean
        autostart?: AutoStart
        defaultBandwidthEstimate?: number
        generateSEOMetadata?: boolean
        liveSyncDuration?: number
        mute?: boolean
        nextupoffset?: NextUpOffset
        pipIcon?: string
        playbackRateControls?: boolean
        playbackRates?: number[]
        playlistIndex?: number
        repeat?: boolean
    }

    type MediaType =
        | 'aac'
        | 'f4a'
        | 'f4v'
        | 'hls'
        | 'm3u'
        | 'm4v'
        | 'mov'
        | 'mp3'
        | 'mp4'
        | 'mpeg'
        | 'oga'
        | 'ogg'
        | 'ogv'
        | 'vorbis'
        | 'webm'

    interface MediaConfig {
        file?: string
        description?: string
        image?: string
        mediaid?: string
        title?: string
        type?: MediaType
    }

    type Preload = 'metadata' | 'auto' | 'none'

    interface RenderAndLoadingConfig {
        base?: string
        flashplayer?: string
        hlsjsdefault?: boolean
        liveTimeout?: number
        loadAndParseHlsMetadata?: boolean
        preload?: Preload
    }

    interface AdvertisingSetup {
        client?: 'dai' | 'freewheel' | 'googima' | 'vast'
        outstream?: boolean
        adscheduleid?: string
        admessage?: string
        type?: string
    }

    interface JWPlayerImage {
        src: string
        width: number
        type: string
    }

    interface JWPlayerSource {
        file: string
        type: string
        width?: number
        height?: number
        label?: string
        bitrate?: number
        framerate?: number | null
        filesize?: number
    }

    interface JWPlayerTrack {
        file: string
        kind: string
        label?: string
    }

    export interface JWPlayerPlaylist {
        image: string
        images: JWPlayerImage[]
        title: string
        mediaid: string
        link: string | null
        duration: number
        pubdate: number
        description: string
        tags: string
        sources: JWPlayerSource[]
        tracks: JWPlayerTrack[]
        [key: string]:
        | JWPlayerTrack[]
        | JWPlayerImage[]
        | JWPlayerSource[]
        | number
        | string
        | null
    }

    export interface JWPlayerConfig
        extends AppearanceConfig,
        BehaviorConfig,
        MediaConfig,
        RenderAndLoadingConfig { }

    type DidMountCallback = () => void

    export interface JWPlayerProps extends JWPlayerConfig {
        didMountCallback?: DidMountCallback
        willUnmountCallback?: () => void
        id?: string
        mediaId?: string
        playerId?: string
        library?: string
        config?: JWPlayerConfig
        playlist?: JWPlayerPlaylist[] | string
        advertising?: AdvertisingSetup
        onControls?: (event: any) => void
        onReady?: (event: any) => void
        onBeforePlay?: (event: any) => void
        onAdRequest?: (event: any) => void
        onAdBreakStart?: (event: any) => void
        onAdBreakEnd?: (event: any) => void
        onAdPlay?: (event: any) => void
        onPlay?: (event: any) => void
        onResize?: (event: any) => void
        onPause?: (event: any) => void
        onViewable?: (event: any) => void
        onLevels?: (event: any) => void
        onAll?: (...args: any[]) => void
        onRelatedReady?: (event: any) => void
        variant?:
        | 'default'
        | 'vertical'
        | 'rounded'
        | 'embedded-content-player'
        | 'outstream'
        className?: string
        showProgressBar?: boolean
        autoStart?: AutoStart
    }

    export const JWPlayerComponent: ComponentType<
        JWPlayerProps & HTMLProps<HTMLVideoElement>
    >

    export default JWPlayerComponent
}
