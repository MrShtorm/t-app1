import { RequestHandlerExtra, Resolver, Tool } from '@nestjs-mcp/server';
import { VideoQueryRepository } from '../infrastructure/repository';
import { CallToolResult } from '@modelcontextprotocol/sdk/types';
import { VideoService } from '../application';
import z from 'zod';
import { Resolutions } from '../domain';

@Resolver('status')
export class VideosMcp {
  constructor(
    private readonly videoService: VideoService,
    private readonly videoQueryRepository: VideoQueryRepository,
  ) {}

  @Tool({ name: 'health_check' })
  healthCheck(): CallToolResult {
    return { content: [{ type: 'text', text: 'OK' }] };
  }

  @Tool({
    name: 'create_video',
    description: 'Создает видео с названием, автором',
    paramsSchema: {
      title: z.string(),
      author: z.string(),
    },
    annotations: {
      destructiveHint: false,
      readOnlyHint: false,
      idempotentHint: true,
    },
  })
  async createVideo(
    {
      title,
      author,
    }: {
      title: string;
      author: string;
    },
    extra: RequestHandlerExtra,
  ): Promise<CallToolResult> {
    const result = await this.videoService.createVideo({
      title,
      author,
      availableResolutions: [Resolutions.P1440],
    });

    if (extra.signal.aborted) {
      return {
        content: [{ type: 'text', text: 'Request was cancelled' }],
      };
    }

    return {
      content: [
        {
          type: 'text',
          text: `Создано видео с id ${result}`,
        },
      ],
    };
  }

  @Tool({
    name: 'update_video',
    description: 'обновляет видео по id и названию, автором',
    paramsSchema: {
      id: z.number(),
      title: z.string(),
      author: z.string(),
    },
    annotations: {
      destructiveHint: false,
      readOnlyHint: false,
      idempotentHint: true,
    },
  })
  async updateVideo(
    {
      id,
      title,
      author,
    }: {
      id: number;
      title: string;
      author: string;
    },
    extra: RequestHandlerExtra,
  ): Promise<CallToolResult> {
    const result = await this.videoService.updateVideo(id, {
      title,
      author,
    });

    if (extra.signal.aborted) {
      return {
        content: [{ type: 'text', text: 'Request was cancelled' }],
      };
    }

    return {
      content: [
        {
          type: 'text',
          text: `Обновлено видео с id ${id}`,
        },
      ],
    };
  }

  @Tool({
    name: 'delete_video',
    description: 'удаляет видео по id',
    paramsSchema: {
      id: z.number(),
    },
    annotations: {
      destructiveHint: true,
      readOnlyHint: false,
    },
  })
  async deleteVideo(
    { id }: { id: number },
    extra: RequestHandlerExtra,
  ): Promise<CallToolResult> {
    await this.videoService.deleteVideo(id);

    if (extra.signal.aborted) {
      return {
        content: [{ type: 'text', text: 'Request was cancelled' }],
      };
    }

    return {
      content: [
        {
          type: 'text',
          text: `Удалено видео с id ${id}`,
        },
      ],
    };
  }

  @Tool({
    name: 'get_video',
    description: 'Получает видео по id',
    paramsSchema: {
      id: z.number(),
    },
    annotations: {
      destructiveHint: false,
      readOnlyHint: false,
      idempotentHint: true,
    },
  })
  async getVideo(
    { id }: { id: number },
    extra: RequestHandlerExtra,
  ): Promise<CallToolResult> {
    const result = await this.videoQueryRepository.findById(id);
    if (extra.signal.aborted) {
      return {
        content: [{ type: 'text', text: 'Request was cancelled' }],
      };
    }

    return {
      content: [
        {
          type: 'text',
          text: `Получено видео: ${JSON.stringify(result)}`,
        },
      ],
    };
  }

  @Tool({
    name: 'get_list_videos',
    description: 'Получает все видео в БД',
    paramsSchema: {},
    annotations: {
      destructiveHint: false,
      readOnlyHint: false,
      idempotentHint: true,
    },
  })
  async getVideos({}, extra: RequestHandlerExtra): Promise<CallToolResult> {
    const result = await this.videoQueryRepository.findAll();
    if (extra.signal.aborted) {
      return {
        content: [{ type: 'text', text: 'Request was cancelled' }],
      };
    }

    return {
      content: [
        {
          type: 'text',
          text: `Получены все видео: ${JSON.stringify(result)}`,
        },
      ],
    };
  }
}
